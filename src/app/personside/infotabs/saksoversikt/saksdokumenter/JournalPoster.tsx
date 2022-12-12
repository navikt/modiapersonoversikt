import * as React from 'react';
import { Sakstema } from '../../../../../models/saksoversikt/sakstema';
import styled from 'styled-components/macro';
import theme, { pxToRem } from '../../../../../styles/personOversiktTheme';
import { Checkbox } from 'nav-frontend-skjema';
import { Journalpost, Entitet } from '../../../../../models/saksoversikt/journalpost';
import { ArrayGroup, groupArray, GroupedArray } from '../../../../../utils/groupArray';
import { Undertittel, Normaltekst, Element } from 'nav-frontend-typografi';
import { saksdatoSomDate } from '../../../../../models/saksoversikt/fellesSak';
import ViktigÅVite from '../viktigavite/viktigavite';
import { DokumentAvsenderFilter } from '../../../../../redux/saksoversikt/types';
import LenkeNorg from '../utils/LenkeNorg';
import ToggleViktigAaViteKnapp from '../viktigavite/ToggleViktigAaViteKnapp';
import { datoSynkende } from '../../../../../utils/date-utils';
import JournalpostListeElement from './JournalPostListeElement/JournalpostListeElement';
import { sakerTest } from '../../dyplenkeTest/utils-dyplenker-test';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { useEffect, useRef } from 'react';
import usePaginering from '../../../../../utils/hooks/usePaginering';
import { useAppState, usePrevious } from '../../../../../utils/customHooks';
import { KategoriSkille } from '../../../dialogpanel/fellesStyling';
import { useDispatch } from 'react-redux';
import { oppdaterAvsenderfilter } from '../../../../../redux/saksoversikt/actions';
import { guid } from 'nav-frontend-js-utils';
import Panel from 'nav-frontend-paneler';
import { useHentAlleSakstemaFraResource, useSakstemaURLState } from '../useSakstemaURLState';
import { aggregertSakstema, forkortetTemanavn } from '../utils/saksoversiktUtils';

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
    gruppe: ArrayGroup<Journalpost>;
    harTilgang: boolean;
    valgtSakstema: Sakstema;
}

function JournalpostGruppe({ gruppe, harTilgang, valgtSakstema }: JournalpostGruppeProps) {
    const tittelId = useRef(guid());
    const journalposter = gruppe.array.map((journalpost) => (
        <JournalpostListeElement
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

function arForDokument(dok: Journalpost) {
    return `${dok.dato.år}`;
}

function hentRiktigAvsenderfilter(avsender: Entitet, avsenderfilter: DokumentAvsenderFilter) {
    switch (avsender) {
        case Entitet.Sluttbruker:
            return avsenderfilter.fraBruker;
        case Entitet.Nav:
            return avsenderfilter.fraNav;
        default:
            return avsenderfilter.fraAndre;
    }
}

interface DokumentListeProps {
    sakstema: Sakstema;
    filtrerteJournalposter: Journalpost[];
}

function JournalpostListe(props: DokumentListeProps) {
    if (props.filtrerteJournalposter.length === 0) {
        return (
            <div aria-live="polite">
                <AlertStripeInfo>Det finnes ingen saksdokumenter for valgte avsender og tema.</AlertStripeInfo>
            </div>
        );
    }

    const journalposterGruppert: GroupedArray<Journalpost> = groupArray(props.filtrerteJournalposter, arForDokument);

    const arsgrupper = journalposterGruppert.map((gruppe: ArrayGroup<Journalpost>) => (
        <JournalpostGruppe
            gruppe={gruppe}
            harTilgang={props.sakstema.harTilgang}
            key={gruppe.category}
            valgtSakstema={props.sakstema}
        />
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

const fieldCompareJournalposter = (journalpost: Journalpost) => journalpost.id;

function JournalPoster(props: Props) {
    const { alleSakstema } = useHentAlleSakstemaFraResource();
    const { valgteSakstemaer } = useSakstemaURLState(alleSakstema);
    const tittelRef = React.createRef<HTMLDivElement>();
    const avsenderFilter = useAppState((state) => state.saksoversikt.avsenderFilter);
    const aggregertSak: Sakstema = aggregertSakstema(alleSakstema, valgteSakstemaer);
    const filtrerteJournalposter = aggregertSak.dokumentMetadata
        .filter((journalpost) => hentRiktigAvsenderfilter(journalpost.avsender, avsenderFilter))
        .sort(datoSynkende((journalpost) => saksdatoSomDate(journalpost.dato)));
    const paginering = usePaginering(filtrerteJournalposter, 50, 'journalpost', undefined, fieldCompareJournalposter);
    const dispatch = useDispatch();
    const handleOppdaterAvsenderFilter = (filter: Partial<DokumentAvsenderFilter>) => {
        dispatch(oppdaterAvsenderfilter(filter));
    };

    const prevSakstema = usePrevious(aggregertSak);
    useEffect(
        function scrollToTopVedNyttSakstema() {
            if (!aggregertSak || !prevSakstema) {
                return;
            }
            if (prevSakstema !== aggregertSak) {
                tittelRef.current && tittelRef.current.focus();
            }
        },
        [aggregertSak, tittelRef, prevSakstema]
    );

    const filterCheckboxer = (
        <Form aria-label="Filter">
            <Checkbox
                label={'Bruker'}
                checked={avsenderFilter.fraBruker}
                onChange={() => handleOppdaterAvsenderFilter({ fraBruker: !avsenderFilter.fraBruker })}
            />
            <Checkbox
                label={'NAV'}
                checked={avsenderFilter.fraNav}
                onChange={() => handleOppdaterAvsenderFilter({ fraNav: !avsenderFilter.fraNav })}
            />
            <Checkbox
                label={'Andre'}
                checked={avsenderFilter.fraAndre}
                onChange={() => handleOppdaterAvsenderFilter({ fraAndre: !avsenderFilter.fraAndre })}
            />
        </Form>
    );

    const tittel =
        props.sakstemaListeDropdown !== undefined ? (
            props.sakstemaListeDropdown
        ) : (
            <Undertittel className={sakerTest.dokument}>{forkortetTemanavn(aggregertSak.temanavn)}</Undertittel>
        );

    return (
        <div>
            <article>
                <StyledPanel aria-label={'Saksdokumenter for ' + aggregertSak.temanavn}>
                    <InfoOgFilterPanel>
                        <div>
                            <TittelWrapperStyling ref={tittelRef} tabIndex={-1}>
                                {tittel}
                                <Normaltekst>({filtrerteJournalposter.length} journalposter)</Normaltekst>
                            </TittelWrapperStyling>
                            {filterCheckboxer}
                        </div>
                        <div>
                            <LenkeNorg valgtSakstema={aggregertSak} />
                            <ToggleViktigAaViteKnapp valgtSakstema={aggregertSak} />
                        </div>
                    </InfoOgFilterPanel>
                    {paginering.pageSelect && <PaginatorStyling>{paginering.pageSelect}</PaginatorStyling>}
                    <ViktigÅVite valgtSakstema={aggregertSak} />
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
