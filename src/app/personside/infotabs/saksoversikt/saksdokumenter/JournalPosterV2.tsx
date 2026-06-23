import { useMatchRoute, useNavigate, useSearch } from '@tanstack/react-router';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { guid } from 'nav-frontend-js-utils';
import Panel from 'nav-frontend-paneler';
import { Checkbox } from 'nav-frontend-skjema';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { createRef, type JSX, useEffect, useRef, useState } from 'react';
import type { Sakstema } from 'src/generated/modiapersonoversikt-api';
import { type Dokumentmetadata, DokumentmetadataAvsender } from 'src/generated/modiapersonoversikt-api';
import { useSakerDokumenter } from 'src/lib/clients/modiapersonoversikt-api';
import { saksdatoSomDate } from 'src/models/saksoversikt/fellesSak';
import type { DokumentAvsenderFilter } from 'src/redux/saksoversikt/types';
import { usePrevious } from 'src/utils/customHooks';
import { datoSynkende } from 'src/utils/date-utils';
import { type ArrayGroup, type GroupedArray, groupArray } from 'src/utils/groupArray';
import styled from 'styled-components';
import theme, { pxToRem } from '../../../../../styles/personOversiktTheme';
import usePaginering from '../../../../../utils/hooks/usePaginering';
import { KategoriSkille } from '../../../dialogpanel/fellesStyling';
import { sakerTest } from '../../dyplenkeTest/utils-dyplenker-test';
import { useHentAlleSakstemaFraResourceV2, useSakstemaURLStateV2 } from '../useSakstemaURLState';
import { aggregertSakstemaV2, forkortetTemanavnV2, sakstemakodeAlle } from '../utils/saksoversiktUtilsV2';
import ToggleViktigAaViteKnapp from '../viktigavite/ToggleViktigAaViteKnapp';
import ViktigÅVite from '../viktigavite/viktigavite';
import JournalpostListeElementV2 from './JournalPostListeElement/JournalpostListeElementV2';

const StyledPanel = styled(Panel)`
  padding: 0rem;
  position: relative;
  margin-bottom: 2rem;
`;

const InfoOgFilterPanel = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: ${pxToRem(15)};
  > *:first-child {
    flex-grow: 1;
  }
  > div {
    > * {
      margin-bottom: 0.5rem;
    }
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  > div:last-child {
    align-items: flex-end;
    flex-grow: 1;
  }
`;

const DokumenterListe = styled.ol`
  padding: 0;
  margin: 0;
  list-style: none;
`;

const ÅrsGruppeStyle = styled.li`
  ol {
    padding: 0;
    margin: 0;
  }
  ol > *:not(:first-child) {
    border-top: ${theme.border.skille};
  }
`;

const Form = styled.form`
  display: flex;
  > *:not(:last-child) {
    padding-right: 1rem;
  }
  > * {
    margin-bottom: 0;
  }
`;

const TittelWrapperStyling = styled.div`
  display: inline-flex;
  align-items: center;
  > *:last-child {
    margin-left: 1rem;
  }
  &:focus {
    outline: none;
  }
`;

interface JournalpostGruppeProps {
    gruppe: ArrayGroup<Dokumentmetadata>;
    harTilgang: boolean;
    valgtSakstema: Sakstema;
}

function JournalpostGruppe({ gruppe, harTilgang, valgtSakstema }: JournalpostGruppeProps) {
    const tittelId = useRef(guid());
    const journalposter = gruppe.array.map((journalpost) => (
        <JournalpostListeElementV2
            journalpost={journalpost}
            harTilgangTilSakstema={harTilgang}
            key={journalpost.id}
            valgtSakstema={valgtSakstema}
        />
    ));

    return (
        <ÅrsGruppeStyle>
            <KategoriSkille>
                <Element tag={'h3'} id={tittelId.current}>
                    <span className="sr-only">Journalposter fra</span>
                    {gruppe.category}
                </Element>
            </KategoriSkille>
            <ol aria-labelledby={tittelId.current}>{journalposter}</ol>
        </ÅrsGruppeStyle>
    );
}

function arForDokument(dok: Dokumentmetadata) {
    return `${new Date(dok.dato).getFullYear()}`;
}

function hentRiktigAvsenderfilter(avsender: DokumentmetadataAvsender, avsenderfilter: DokumentAvsenderFilter) {
    switch (avsender) {
        case DokumentmetadataAvsender.SLUTTBRUKER:
            return avsenderfilter.fraBruker;
        case DokumentmetadataAvsender.NAV:
            return avsenderfilter.fraNav;
        default:
            return avsenderfilter.fraAndre;
    }
}

interface DokumentListeProps {
    sakstema: Sakstema;
    filtrerteJournalposter: Dokumentmetadata[];
}

function JournalpostListe(props: DokumentListeProps) {
    if (props.filtrerteJournalposter.length === 0) {
        return (
            <div aria-live="polite">
                <AlertStripeInfo>Det finnes ingen saksdokumenter for valgte avsender og tema.</AlertStripeInfo>
            </div>
        );
    }

    const journalposterGruppert: GroupedArray<Dokumentmetadata> = groupArray(
        props.filtrerteJournalposter,
        arForDokument
    );

    const arsgrupper = journalposterGruppert.map((gruppe: ArrayGroup<Dokumentmetadata>) => (
        <JournalpostGruppe gruppe={gruppe} harTilgang={true} key={gruppe.category} valgtSakstema={props.sakstema} />
    ));

    return <DokumenterListe aria-label="Dokumenter gruppert på årstall">{arsgrupper}</DokumenterListe>;
}

const PaginatorStyling = styled.div`
  label {
    ${theme.visuallyHidden};
  }
  padding: ${pxToRem(15)};
  padding-top: 0;
  .skjemaelement {
    margin: 0;
  }
`;

const PrevNextButtonsStyling = styled.div`
  padding: ${pxToRem(15)};
`;

interface Props {
    sakstemaListeDropdown?: JSX.Element;
}

const fieldCompareJournalposter = (journalpost: Dokumentmetadata) => journalpost.id;

function JournalPoster(props: Props) {
    const navigate = useNavigate();
    const avsenderFilterQuery = useSearch({ strict: false }).avsender;
    const isFullscreen = useMatchRoute()({ to: '/saker' });

    const { alleSakstema } = useHentAlleSakstemaFraResourceV2();
    const { valgteSakstemaer } = useSakstemaURLStateV2(alleSakstema);
    const { data } = useSakerDokumenter();
    const tittelRef = createRef<HTMLDivElement>();
    const aggregertSak: Sakstema = aggregertSakstemaV2(alleSakstema, valgteSakstemaer);

    const avsenderFilter: DokumentAvsenderFilter = {
        fraNav: !!avsenderFilterQuery?.includes('nav'),
        fraAndre: !!avsenderFilterQuery?.includes('andre'),
        fraBruker: !!avsenderFilterQuery?.includes('bruker')
    };
    const valgteTemaKoder = valgteSakstemaer.map((t) => t.temakode);
    const filtrerteJournalposter = (data?.dokumenter ?? [])
        .filter(
            (journalpost) =>
                aggregertSak.temakode === sakstemakodeAlle || valgteTemaKoder.includes(journalpost.temakode)
        )
        .filter((journalpost) => hentRiktigAvsenderfilter(journalpost.avsender, avsenderFilter))
        .sort(datoSynkende((journalpost) => saksdatoSomDate(journalpost.dato)));
    const paginering = usePaginering<Dokumentmetadata, string>(
        filtrerteJournalposter,
        50,
        'journalpost',
        undefined,
        fieldCompareJournalposter
    );
    const handleOppdaterAvsenderFilter = (filter: 'nav' | 'andre' | 'bruker') => {
        const query = avsenderFilterQuery ?? [];
        const avsender = query.includes(filter) ? query.filter((f) => f !== filter) : [...query, filter];
        navigate({
            from: isFullscreen ? '/saker' : '/person/saker',
            search: { avsender }
        });
    };

    const prevSakstemaKode = usePrevious(aggregertSak.temakode);
    useEffect(
        function scrollToTopVedNyttSakstema() {
            if (!aggregertSak || !prevSakstemaKode) {
                return;
            }
            if (prevSakstemaKode !== aggregertSak.temakode) {
                if (tittelRef.current) tittelRef.current.focus();
            }
        },
        [aggregertSak, tittelRef, prevSakstemaKode]
    );

    const filterCheckboxer = (
        <Form aria-label="Filter">
            <Checkbox
                label={'Bruker'}
                checked={avsenderFilter.fraBruker}
                onChange={() => handleOppdaterAvsenderFilter('bruker')}
            />
            <Checkbox
                label={'NAV'}
                checked={avsenderFilter.fraNav}
                onChange={() => handleOppdaterAvsenderFilter('nav')}
            />
            <Checkbox
                label={'Andre'}
                checked={avsenderFilter.fraAndre}
                onChange={() => handleOppdaterAvsenderFilter('andre')}
            />
        </Form>
    );

    const tittel =
        props.sakstemaListeDropdown !== undefined ? (
            props.sakstemaListeDropdown
        ) : (
            <Undertittel className={sakerTest.dokument}>{forkortetTemanavnV2(aggregertSak.temanavn)}</Undertittel>
        );

    const [viktigaviteOpen, setViktigaviteOpen] = useState(false);

    return (
        <div>
            <article>
                <StyledPanel aria-label={`Saksdokumenter for ${aggregertSak.temanavn}`}>
                    <InfoOgFilterPanel>
                        <div>
                            <TittelWrapperStyling ref={tittelRef} tabIndex={-1}>
                                {tittel}
                                <Normaltekst>({filtrerteJournalposter.length} journalposter)</Normaltekst>
                            </TittelWrapperStyling>
                            {filterCheckboxer}
                        </div>
                        <div>
                            <ToggleViktigAaViteKnapp
                                open={viktigaviteOpen}
                                setOpen={setViktigaviteOpen}
                                valgtSakstema={aggregertSak}
                            />
                        </div>
                    </InfoOgFilterPanel>
                    {paginering.pageSelect && <PaginatorStyling>{paginering.pageSelect}</PaginatorStyling>}
                    <ViktigÅVite valgtSakstema={aggregertSak} open={viktigaviteOpen} />
                    <JournalpostListe sakstema={aggregertSak} filtrerteJournalposter={paginering.currentPage} />
                    {paginering.prevNextButtons && (
                        <PrevNextButtonsStyling>{paginering.prevNextButtons}</PrevNextButtonsStyling>
                    )}
                </StyledPanel>
                <AlertStripeInfo>
                    Modia viser elektroniske dokumenter brukeren har sendt inn via nav.no etter 9. desember 2014.
                    Dokumenter som er journalført vises fra og med 4.juni 2016
                </AlertStripeInfo>
            </article>
        </div>
    );
}

export default JournalPoster;
