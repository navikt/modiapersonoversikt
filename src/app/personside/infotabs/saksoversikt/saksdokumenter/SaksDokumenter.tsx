import * as React from 'react';
import { Sakstema } from '../../../../../models/saksoversikt/sakstema';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import Checkbox from 'nav-frontend-skjema/lib/checkbox';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { DokumentMetadata, Entitet } from '../../../../../models/saksoversikt/dokumentmetadata';
import { ArrayGroup, groupArray, GroupedArray } from '../../../../../utils/groupArray';
import DokumentKomponent from './DokumentListeElement';
import { AlignTextCenter, Bold, Uppercase } from '../../../../../components/common-styled-components';
import { Normaltekst } from 'nav-frontend-typografi';
import { saksdatoSomDate } from '../../../../../models/saksoversikt/fellesSak';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import ViktigÅVite from '../viktigavite/viktigavite';
import { DokumentAvsenderFilter } from '../../../../../redux/saksoversikt/types';
import LenkeNorg from '../utils/LenkeNorg';
import ToggleViktigAaViteKnapp from '../viktigavite/ToggleViktigAaViteKnapp';

interface Props {
    valgtSakstema?: Sakstema;
    avsenderFilter: DokumentAvsenderFilter;
    erStandaloneVindu: boolean;
    visDokument: boolean;
    oppdaterAvsenderfilter: (filter: Partial<DokumentAvsenderFilter>) => void;
    lukkDokument: () => void;
}

interface DokumentGruppeProps {
    gruppe: ArrayGroup<DokumentMetadata>;
    harTilgang: boolean;
    sakstemakode: string;
}

const SaksdokumenterStyling = styled.section`
    position: relative;
    flex-grow: 1;
`;

const InfoOgFilterPanel = styled.section`
    ${theme.hvittPanel};
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
    }
`;

const DokumenterListe = styled.ol`
    padding: 0;
    margin: 0;
    list-style: none;
`;

const ÅrsGruppeStyle = styled.li`
    > *:first-child {
        padding: 0.2rem ${theme.margin.px10};
    }
    ol {
        ${theme.hvittPanel};
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

const Luft = styled.div`
    margin-top: 2rem;
`;

const TittleWrapper = styled.span`
    &:focus {
        outline: none;
    }
`;

function Dokumentgruppe({ gruppe, harTilgang, sakstemakode }: DokumentGruppeProps) {
    const dokumentKomponenter = gruppe.array.map(dokument => (
        <DokumentKomponent
            dokument={dokument}
            harTilgangTilSakstema={harTilgang}
            sakstemakode={sakstemakode}
            sakstemanavn={dokument.temakodeVisning}
            key={dokument.id}
        />
    ));

    return (
        <ÅrsGruppeStyle>
            <Normaltekst tag={'h3'}>
                <AlignTextCenter>
                    <Bold>
                        <Uppercase>{gruppe.category}</Uppercase>
                    </Bold>
                </AlignTextCenter>
            </Normaltekst>
            <ol>{dokumentKomponenter}</ol>
        </ÅrsGruppeStyle>
    );
}

function dokumentComparator(a: DokumentMetadata, b: DokumentMetadata) {
    const aDate = saksdatoSomDate(a.dato);
    const bDate = saksdatoSomDate(b.dato);

    if (aDate > bDate) {
        return -1;
    }
    if (aDate < bDate) {
        return 1;
    }
    return 0;
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
    avsenderFilter: DokumentAvsenderFilter;
}

function DokumentListe(props: DokumentListeProps) {
    const filtrerteDokumenter = props.sakstema.dokumentMetadata.filter(metadata =>
        hentRiktigAvsenderfilter(metadata.avsender, props.avsenderFilter)
    );

    if (filtrerteDokumenter.length === 0) {
        return <AlertStripeInfo>Det finnes ingen saksdokumenter for valgte avsender.</AlertStripeInfo>;
    }

    const dokumenterGruppert: GroupedArray<DokumentMetadata> = groupArray(
        filtrerteDokumenter.sort(dokumentComparator),
        årForDokument
    );

    const årsgrupper = dokumenterGruppert.map((gruppe: ArrayGroup<DokumentMetadata>) => (
        <Dokumentgruppe
            gruppe={gruppe}
            harTilgang={props.sakstema.harTilgang}
            sakstemakode={props.sakstema.temakode}
            key={gruppe.category}
        />
    ));

    return (
        <>
            <DokumenterListe aria-label="Dokumenter gruppert på årstall">{årsgrupper}</DokumenterListe>
            <Luft />
            <AlertStripeInfo>
                Modia viser elektroniske dokumenter brukeren har sendt inn via nav.no etter 9. desember 2014. Dokumenter
                som er journalført vises fra og med 4.juni 2016
            </AlertStripeInfo>
        </>
    );
}

class SaksDokumenter extends React.PureComponent<Props> {
    private tittelRef = React.createRef<HTMLSpanElement>();

    componentDidUpdate(prevProps: Props) {
        if (!prevProps.valgtSakstema || !this.props.valgtSakstema) {
            return;
        }

        if (prevProps.valgtSakstema.temanavn !== this.props.valgtSakstema.temanavn) {
            if (this.tittelRef.current) {
                this.tittelRef.current.focus();
            }
        }
    }

    render() {
        const props = this.props;

        if (!props.valgtSakstema) {
            return null;
        }

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

        const tilbakeLenke =
            props.erStandaloneVindu && props.visDokument ? (
                <a href={'#'} onClick={props.lukkDokument}>
                    Tilbake til saksoversikt
                </a>
            ) : null;

        return (
            <SaksdokumenterStyling aria-label={'Saksdokumenter for ' + props.valgtSakstema.temanavn}>
                <InfoOgFilterPanel>
                    <div>
                        {tilbakeLenke}
                        <TittleWrapper ref={this.tittelRef} tabIndex={-1}>
                            <Undertittel>{props.valgtSakstema.temanavn}</Undertittel>
                        </TittleWrapper>
                        {filterCheckboxer}
                    </div>
                    <div>
                        <LenkeNorg />
                        <ToggleViktigAaViteKnapp />
                    </div>
                </InfoOgFilterPanel>
                <ViktigÅVite />
                <DokumentListe sakstema={props.valgtSakstema} avsenderFilter={props.avsenderFilter} />
            </SaksdokumenterStyling>
        );
    }
}

export default SaksDokumenter;
