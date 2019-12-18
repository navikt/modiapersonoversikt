import * as React from 'react';
import { Sakstema } from '../../../../../models/saksoversikt/sakstema';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import { Checkbox } from 'nav-frontend-skjema';
import { DokumentMetadata, Entitet } from '../../../../../models/saksoversikt/dokumentmetadata';
import { ArrayGroup, groupArray, GroupedArray } from '../../../../../utils/groupArray';
import { Undertittel, Normaltekst, Element } from 'nav-frontend-typografi';
import { saksdatoSomDate } from '../../../../../models/saksoversikt/fellesSak';
import ViktigÅVite from '../viktigavite/viktigavite';
import { DokumentAvsenderFilter } from '../../../../../redux/saksoversikt/types';
import LenkeNorg from '../utils/LenkeNorg';
import ToggleViktigAaViteKnapp from '../viktigavite/ToggleViktigAaViteKnapp';
import { datoSynkende } from '../../../../../utils/dateUtils';
import DropDownMenu from '../../../../../components/DropDownMenu';
import DokumentListeElement from './DokumentListeElement';
import { sakerTest } from '../../dyplenkeTest/utils';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import SakstemaListe from '../sakstemaliste/SakstemaListe';
import { useEffect } from 'react';
import usePaginering from '../../../../../utils/hooks/usePaginering';
import { usePrevious } from '../../../../../utils/customHooks';
import { KategoriSkille } from '../../../dialogpanel/fellesStyling';

interface Props {
    valgtSakstema: Sakstema;
    avsenderFilter: DokumentAvsenderFilter;
    erStandaloneVindu: boolean;
    oppdaterAvsenderfilter: (filter: Partial<DokumentAvsenderFilter>) => void;
    lukkDokument: () => void;
}

interface DokumentGruppeProps {
    gruppe: ArrayGroup<DokumentMetadata>;
    harTilgang: boolean;
    sakstemakode: string;
}

const SaksdokumenterStyling = styled.section`
    ${theme.hvittPanel};
    position: relative;
    margin-bottom: 2rem;
`;

const InfoOgFilterPanel = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: ${theme.margin.px20};
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

function Dokumentgruppe({ gruppe, harTilgang, sakstemakode }: DokumentGruppeProps) {
    const dokumentKomponenter = gruppe.array.map(dokument => (
        <DokumentListeElement
            dokumentMetadata={dokument}
            harTilgangTilSakstema={harTilgang}
            sakstemakode={sakstemakode}
            sakstemanavn={dokument.temakodeVisning}
            key={dokument.id}
        />
    ));

    return (
        <ÅrsGruppeStyle>
            <KategoriSkille>
                <Element tag={'h3'}>{gruppe.category}</Element>
            </KategoriSkille>
            <ol>{dokumentKomponenter}</ol>
        </ÅrsGruppeStyle>
    );
}

function årForDokument(dok: DokumentMetadata) {
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
    filtrerteDokumenter: DokumentMetadata[];
}

function DokumentListe(props: DokumentListeProps) {
    if (props.filtrerteDokumenter.length === 0) {
        return (
            <div aria-live="polite">
                <AlertStripeInfo>
                    Det finnes ingen saksdokumenter for valgte avsender og tema {props.sakstema.temanavn.toLowerCase()}.
                </AlertStripeInfo>
            </div>
        );
    }

    const dokumenterGruppert: GroupedArray<DokumentMetadata> = groupArray(props.filtrerteDokumenter, årForDokument);

    const årsgrupper = dokumenterGruppert.map((gruppe: ArrayGroup<DokumentMetadata>) => (
        <Dokumentgruppe
            gruppe={gruppe}
            harTilgang={props.sakstema.harTilgang}
            sakstemakode={props.sakstema.temakode}
            key={gruppe.category}
        />
    ));

    return <DokumenterListe aria-label="Dokumenter gruppert på årstall">{årsgrupper}</DokumenterListe>;
}

const PaginatorStyling = styled.div`
    label {
        ${theme.visuallyHidden};
    }
    .skjemaelement {
        margin: 1rem 0 0;
    }
`;

const PrevNextButtonsStyling = styled.div`
    margin-top: 0.5rem;
`;

function SaksDokumenter(props: Props) {
    const tittelRef = React.createRef<HTMLDivElement>();
    const filtrerteDokumenter = props.valgtSakstema.dokumentMetadata
        .filter(metadata => hentRiktigAvsenderfilter(metadata.avsender, props.avsenderFilter))
        .sort(datoSynkende(dokumentmetadata => saksdatoSomDate(dokumentmetadata.dato)));
    const paginering = usePaginering(filtrerteDokumenter, 50, 'journalpost');

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
                checked={props.avsenderFilter.fraBruker}
                onChange={() => props.oppdaterAvsenderfilter({ fraBruker: !props.avsenderFilter.fraBruker })}
            />
            <Checkbox
                label={'NAV'}
                checked={props.avsenderFilter.fraNav}
                onChange={() => props.oppdaterAvsenderfilter({ fraNav: !props.avsenderFilter.fraNav })}
            />
            <Checkbox
                label={'Andre'}
                checked={props.avsenderFilter.fraAndre}
                onChange={() => props.oppdaterAvsenderfilter({ fraAndre: !props.avsenderFilter.fraAndre })}
            />
        </Form>
    );

    const tittel = <Undertittel className={sakerTest.dokument}>{props.valgtSakstema.temanavn}</Undertittel>;
    const valgtSakstemaTittel = props.erStandaloneVindu ? (
        <DropDownMenu header={tittel}>
            <SakstemaListe valgtSakstema={props.valgtSakstema} />
        </DropDownMenu>
    ) : (
        tittel
    );

    return (
        <>
            <SaksdokumenterStyling aria-label={'Saksdokumenter for ' + props.valgtSakstema.temanavn}>
                <InfoOgFilterPanel>
                    <div>
                        <TittelWrapperStyling ref={tittelRef} tabIndex={-1}>
                            {valgtSakstemaTittel}
                            <Normaltekst>({filtrerteDokumenter.length} journalposter)</Normaltekst>
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
                <DokumentListe sakstema={props.valgtSakstema} filtrerteDokumenter={paginering.currentPage} />
                {paginering.prevNextButtons && (
                    <PrevNextButtonsStyling>{paginering.prevNextButtons}</PrevNextButtonsStyling>
                )}
            </SaksdokumenterStyling>
            <AlertStripeInfo>
                Modia viser elektroniske dokumenter brukeren har sendt inn via nav.no etter 9. desember 2014. Dokumenter
                som er journalført vises fra og med 4.juni 2016
            </AlertStripeInfo>
        </>
    );
}

export default SaksDokumenter;
