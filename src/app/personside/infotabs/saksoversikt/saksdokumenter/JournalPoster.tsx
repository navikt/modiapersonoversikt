import * as React from 'react';
import { Sakstema } from '../../../../../models/saksoversikt/sakstema';
import styled from 'styled-components';
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
import { datoSynkende } from '../../../../../utils/dateUtils';
import DropDownMenu from '../../../../../components/DropDownMenu';
import JournalpostLiseElement from './JournalpostLiseElement';
import { sakerTest } from '../../dyplenkeTest/utils';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import SakstemaListe from '../sakstemaliste/SakstemaListe';
import { useEffect } from 'react';
import usePaginering from '../../../../../utils/hooks/usePaginering';
import { useAppState, usePrevious } from '../../../../../utils/customHooks';
import { KategoriSkille } from '../../../dialogpanel/fellesStyling';
import { useDispatch } from 'react-redux';
import { oppdaterAvsenderfilter } from '../../../../../redux/saksoversikt/actions';

interface Props {
    valgtSakstema: Sakstema;
}

interface JournalpostGruppeProps {
    gruppe: ArrayGroup<Journalpost>;
    harTilgang: boolean;
    valgtSakstema: Sakstema;
}

const JournalposterStyling = styled.section`
    ${theme.hvittPanel};
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

function JournalpostGruppe({ gruppe, harTilgang, valgtSakstema }: JournalpostGruppeProps) {
    const journalposter = gruppe.array.map(journalpost => (
        <JournalpostLiseElement
            journalpost={journalpost}
            harTilgangTilSakstema={harTilgang}
            key={journalpost.id}
            valgtSakstema={valgtSakstema}
        />
    ));

    return (
        <ÅrsGruppeStyle>
            <KategoriSkille>
                <Element tag={'h3'}>{gruppe.category}</Element>
            </KategoriSkille>
            <ol>{journalposter}</ol>
        </ÅrsGruppeStyle>
    );
}

function årForDokument(dok: Journalpost) {
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
                <AlertStripeInfo>
                    Det finnes ingen saksdokumenter for valgte avsender og tema {props.sakstema.temanavn.toLowerCase()}.
                </AlertStripeInfo>
            </div>
        );
    }

    const journalposterGruppert: GroupedArray<Journalpost> = groupArray(props.filtrerteJournalposter, årForDokument);

    const årsgrupper = journalposterGruppert.map((gruppe: ArrayGroup<Journalpost>) => (
        <JournalpostGruppe
            gruppe={gruppe}
            harTilgang={props.sakstema.harTilgang}
            key={gruppe.category}
            valgtSakstema={props.sakstema}
        />
    ));

    return <DokumenterListe aria-label="Dokumenter gruppert på årstall">{årsgrupper}</DokumenterListe>;
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

function JournalPoster(props: Props) {
    const tittelRef = React.createRef<HTMLDivElement>();
    const avsenderFilter = useAppState(state => state.saksoversikt.avsenderFilter);
    const filtrerteJournalposter = props.valgtSakstema.journalPoster
        .filter(journalpost => hentRiktigAvsenderfilter(journalpost.avsender, avsenderFilter))
        .sort(datoSynkende(journalpost => saksdatoSomDate(journalpost.dato)));
    const paginering = usePaginering(filtrerteJournalposter, 50, 'journalpost');
    const erStandaloneVindu = useAppState(state => state.saksoversikt.erStandaloneVindu);
    const dispatch = useDispatch();
    const handleOppdaterAvsenderFilter = (filter: Partial<DokumentAvsenderFilter>) => {
        dispatch(oppdaterAvsenderfilter(filter));
    };

    const prevSakstema = usePrevious(props.valgtSakstema);
    useEffect(
        function scrollToTopVedNyttSakstema() {
            if (!props.valgtSakstema || !prevSakstema) {
                return;
            }
            if (prevSakstema !== props.valgtSakstema) {
                tittelRef.current && tittelRef.current.focus();
            }
        },
        [props.valgtSakstema, tittelRef, prevSakstema]
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

    const tittel = <Undertittel className={sakerTest.dokument}>{props.valgtSakstema.temanavn}</Undertittel>;
    const valgtSakstemaTittel = erStandaloneVindu ? (
        <DropDownMenu header={tittel}>
            <SakstemaListe valgtSakstema={props.valgtSakstema} />
        </DropDownMenu>
    ) : (
        tittel
    );

    return (
        <div>
            <JournalposterStyling aria-label={'Saksdokumenter for ' + props.valgtSakstema.temanavn}>
                <InfoOgFilterPanel>
                    <div>
                        <TittelWrapperStyling ref={tittelRef} tabIndex={-1}>
                            {valgtSakstemaTittel}
                            <Normaltekst>({filtrerteJournalposter.length} journalposter)</Normaltekst>
                        </TittelWrapperStyling>
                        {filterCheckboxer}
                    </div>
                    <div>
                        <LenkeNorg valgtSakstema={props.valgtSakstema} />
                        <ToggleViktigAaViteKnapp valgtSakstema={props.valgtSakstema} />
                    </div>
                </InfoOgFilterPanel>
                {paginering.pageSelect && <PaginatorStyling>{paginering.pageSelect}</PaginatorStyling>}
                <ViktigÅVite valgtSakstema={props.valgtSakstema} />
                <JournalpostListe sakstema={props.valgtSakstema} filtrerteJournalposter={paginering.currentPage} />
                {paginering.prevNextButtons && (
                    <PrevNextButtonsStyling>{paginering.prevNextButtons}</PrevNextButtonsStyling>
                )}
            </JournalposterStyling>
            <AlertStripeInfo>
                Modia viser elektroniske dokumenter brukeren har sendt inn via nav.no etter 9. desember 2014. Dokumenter
                som er journalført vises fra og med 4.juni 2016
            </AlertStripeInfo>
        </div>
    );
}

export default JournalPoster;
