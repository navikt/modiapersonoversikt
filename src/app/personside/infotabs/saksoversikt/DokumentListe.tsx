import * as React from 'react';
import { Sakstema } from '../../../../models/saksoversikt/sakstema';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import Checkbox from 'nav-frontend-skjema/lib/checkbox';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { DokumentMetadata, Entitet } from '../../../../models/saksoversikt/dokumentmetadata';
import { ArrayGroup, groupArray, GroupedArray } from '../../../../utils/groupArray';
import DokumentKomponent from './DokumentKomponent';
import { Bold, Uppercase } from '../../../../components/common-styled-components';
import { Normaltekst } from 'nav-frontend-typografi';
import { saksdatoSomDate } from '../../../../models/saksoversikt/fellesSak';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import ViktigÅVite from './viktigavite/viktigavite';
import { DokumentAvsenderFilter } from '../../../../redux/saksoversikt/types';

interface Props {
    valgtSakstema?: Sakstema;
    avsenderFilter: DokumentAvsenderFilter;
    oppdaterAvsenderfilter: (filter: Partial<DokumentAvsenderFilter>) => void;
}

interface DokumentGruppeProps {
    gruppe: ArrayGroup<DokumentMetadata>;
    harTilgang: boolean;
    sakstemakode: string;
}

const DokumentListeStyling = styled.section`
  border-radius: ${theme.borderRadius.layout};
  background-color: white;
  position: relative;
  flex-grow: 1;
`;

const Header = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: ${theme.margin.px20};
  padding-bottom: 0;
  > *:first-child {
        flex-grow: 1;
    }
`;

const DokumenterArticle = styled.article`
  background-color: white;
  border-radius: ${theme.borderRadius.layout};
`;

const DokumenterListe = styled.ol`
  padding: 0;
  margin: 0;
  list-style: none;
`;

const ÅrsGruppeStyle = styled.li`
  > *:first-child {
    background-color: ${theme.color.kategori};
    padding: .2rem ${theme.margin.px10};
  }
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
`;

function Dokumentgruppe({gruppe, harTilgang, sakstemakode}: DokumentGruppeProps) {
    const dokumentKomponenter = gruppe.array.map(dokument => (
        <DokumentKomponent
            dokument={dokument}
            harTilgang={harTilgang}
            sakstemakode={sakstemakode}
            sakstemanavn={dokument.temakodeVisning}
            key={dokument.hoveddokument.dokumentreferanse + dokument.journalpostId}
        />
    ));

    return (
        <ÅrsGruppeStyle>
            <Normaltekst tag={'h3'}><Bold><Uppercase>{gruppe.category}</Uppercase></Bold></Normaltekst>
            <ol>
                {dokumentKomponenter}
            </ol>
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

function hentDokumentinnhold(sakstema: Sakstema, avsenderFilter: DokumentAvsenderFilter) {
    const filtrerteDokumenter = sakstema.dokumentMetadata.filter(metadata =>
        hentRiktigAvsenderfilter(metadata.avsender, avsenderFilter));

    if (filtrerteDokumenter.length === 0) {
        return (
            <AlertStripeInfo>
                Det finnes ingen saksdokumenter for valgte avsender.
            </AlertStripeInfo>
        );
    }

    const dokumenterGruppert: GroupedArray<DokumentMetadata> = groupArray(
        filtrerteDokumenter.sort(dokumentComparator),
        årForDokument
    );

    const årsgrupper = dokumenterGruppert.map((gruppe: ArrayGroup<DokumentMetadata>) =>
        (
            <Dokumentgruppe
                gruppe={gruppe}
                harTilgang={sakstema.harTilgang}
                sakstemakode={sakstema.temakode}
                key={gruppe.category}
            />
        )
    );

    return (
        <DokumenterArticle>
            <DokumenterListe>
                {årsgrupper}
            </DokumenterListe>
            <AlertStripeInfo>
                Modia viser elektroniske dokumenter brukeren har sendt inn via nav.no etter 9. desember 2014.
                Dokumenter som er journalført vises fra og med 4.juni 2016
            </AlertStripeInfo>
        </DokumenterArticle>
    );
}

function DokumentListe(props: Props) {
    if (!props.valgtSakstema) {
        return null;
    }

    const checkboxer = (
        <Form>
            <Checkbox
                label={'Bruker'}
                checked={props.avsenderFilter.fraBruker}
                onChange={() => props.oppdaterAvsenderfilter({fraBruker: !props.avsenderFilter.fraBruker})}
            />
            <Checkbox
                label={'NAV'}
                checked={props.avsenderFilter.fraNav}
                onChange={() => props.oppdaterAvsenderfilter({fraNav: !props.avsenderFilter.fraNav})}
            />
            <Checkbox
                label={'Andre'}
                checked={props.avsenderFilter.fraAndre}
                onChange={() => props.oppdaterAvsenderfilter({fraAndre: !props.avsenderFilter.fraAndre})}
            />
        </Form>
    );

    const dokumentinnhold = hentDokumentinnhold(props.valgtSakstema, props.avsenderFilter);

    return (
        <DokumentListeStyling>
            <Header>
                <Undertittel>{props.valgtSakstema.temanavn}</Undertittel>
                {checkboxer}
            </Header>
            <ViktigÅVite/>
            {dokumentinnhold}
        </DokumentListeStyling>
    );
}

export default DokumentListe;