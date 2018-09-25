import * as React from 'react';
import { Sakstema } from '../../../../models/saksoversikt/sakstema';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import Checkbox from 'nav-frontend-skjema/lib/checkbox';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { DokumentMetadata } from '../../../../models/saksoversikt/dokumentmetadata';
import { ArrayGroup, groupArray, GroupedArray } from '../../../../utils/groupArray';
import DokumentKomponent from './DokumentKomponent';
import { Bold, Uppercase } from '../../../../components/common-styled-components';
import { Undertekst } from 'nav-frontend-typografi';
import { saksdatoSomDate } from '../../../../models/saksoversikt/fellesSak';
import { Link } from 'react-router-dom';

const norgUrl = 'https://norg2-frontend.nais.preprod.local/#/startsok?tema='; // TODO Flytt til property

interface Props {
    sakstema?: Sakstema;
}

const CheckboxWrapper = styled.section`
  background-color: white;
  border-radius: ${theme.borderRadius.layout};
  padding: ${theme.margin.px20} ${theme.margin.px20} 2rem;
  display: flex;
  flex-direction: row;
  > * {
    padding: 10px;
  }
`;

const DokumenterArticle = styled.article`
  background-color: white;
  border-radius: ${theme.borderRadius.layout};
  margin-top: ${theme.margin.layout};
  > *:first-child {
    padding: ${theme.margin.px20};
  }
`;

const DokumenterListe = styled.ol`
  padding: 0 ${theme.margin.px10};
  margin: 0;
`;

const ÅrsGruppeStyle = styled.li`
  > *:first-child {
    background-color: rgba(102, 203, 236, 0.18);
    padding: .2rem ${theme.margin.px10};
  }
  ol {
    padding: 0;
    margin: 0;
  }
  ol > *:not(:first-child) {
    border-top: solid 2px ${theme.color.bakgrunn};
  }
`;

const Wrapper = styled.div`
  ol {
    list-style: none;
  }
  table {
    width: 100%;
    text-align: right;
    border-spacing: 0;
    * {
      padding: 0;
      margin: 0;
    }
    tr {
      > * {
        padding: 0.1rem;
        text-align: right;
      }
      > *:first-child {
        text-align: left;
      }
      > *:not(:first-child) {
        width: 6rem;
      }
    }
  }
`;

const LenkeNorgStyle = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  font-size: 0.9em;
`;

function LenkeNorg({url}: {url: string}) {
    return (
        <LenkeNorgStyle>
            <Link
                id={'lenketilnorg'}
                className={'lenke'}
                to={url}
            >
                Oversikt over enheter og tema de behandler
            </Link>
        </LenkeNorgStyle>
    );
}

function Dokumentgruppe({gruppe}: {gruppe: ArrayGroup<DokumentMetadata>}) {
    const dokumentKomponenter = gruppe.array.map(dokument => (
        <DokumentKomponent
            dokument={dokument}
            key={dokument.temakode + dokument.dato.år + dokument.dato.måned + dokument.dato.dag + dokument.dato.time}
        />
    ));

    return (
        <ÅrsGruppeStyle>
            <Undertekst tag={'h3'}><Bold><Uppercase>{gruppe.category}</Uppercase></Bold></Undertekst>
            <ol>
                {dokumentKomponenter}
            </ol>
        </ÅrsGruppeStyle>
    );
}

function dokumentComparator(a: DokumentMetadata, b: DokumentMetadata) {
    const aDate = saksdatoSomDate(a.dato);
    const bDate = saksdatoSomDate(b.dato);

    if (aDate > bDate) { return -1; }
    if (aDate < bDate) { return 1; }
    return 0;
}

function årForDokument(dok: DokumentMetadata) {
    return `${dok.dato.år}`;
}

function DokumenterVisning(props: Props) {
    if (!props.sakstema) {
        return <b>Ingen saker</b>;
    }

    const filtrerteDokumenter = props.sakstema.dokumentMetadata;

    if (filtrerteDokumenter.length === 0) {
        return (
            <AlertStripeInfo>
                Det finnes ingen utbetalinger for valgte kombinasjon av periode og filtrering.
            </AlertStripeInfo>
        );
    }

    const dokumenterGruppert: GroupedArray<DokumentMetadata> = groupArray(
        filtrerteDokumenter.sort(dokumentComparator),
        årForDokument
    );

    const årsgrupper = dokumenterGruppert.map((gruppe: ArrayGroup<DokumentMetadata>) =>
        <Dokumentgruppe gruppe={gruppe} key={gruppe.category} />
    );

    const url = norgUrl + props.sakstema.temakode;

    return (
        <Wrapper>
            <CheckboxWrapper>
                <LenkeNorg url={url}/>
                <Checkbox label={'Bruker'} checked={true}/>
                <Checkbox label={'NAV'} checked={true}/>
                <Checkbox label={'Andre'} checked={true}/>
            </CheckboxWrapper>
            <DokumenterArticle>
                <DokumenterListe>
                    {årsgrupper}
                </DokumenterListe>
            </DokumenterArticle>
        </Wrapper>
    );
}

export default DokumenterVisning;