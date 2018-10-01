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
import { Normaltekst, Undertekst } from 'nav-frontend-typografi';
import { saksdatoSomDate } from '../../../../models/saksoversikt/fellesSak';
import { BaseUrlsResponse } from '../../../../models/baseurls';
import { hentBaseUrl } from '../../../../redux/restReducers/baseurls';
import { AvsenderFilter } from './SaksoversiktContainer';

interface Props {
    sakstema?: Sakstema;
    baseUrlsResponse: BaseUrlsResponse;
    avsenderFilter: AvsenderFilter;
    toggleFilter: (key: keyof AvsenderFilter) => void;
}

interface DokumentGruppeProps {
    gruppe: ArrayGroup<DokumentMetadata>;
    harTilgang: boolean;
}

const Header = styled.section`
  padding: ${theme.margin.px20} ${theme.margin.px20} 2rem;
  display: flex;
  flex-wrap: wrap;
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

const LenkeWrapper = styled.div`
  > *:first-child {
    padding-bottom: 0.5rem;
  }
`;

const LenkeNorgStyle = styled.div`
  flex-grow: 1;
  white-space: nowrap;
`;

const Form = styled.form`
  display: flex;
  > *:not(:last-child) {
    padding-right: 1rem;
  }
`;

function lenkeNorg(sakstema: string, norg2Url: string) {
    return (
        <LenkeNorgStyle>
            <a
                href={`${norg2Url}/#/startsok?tema=${sakstema}`}
                target="_blank"
                rel="noopener noreferrer"
                className="lenke"
            >
                <Normaltekst tag="span">
                    Oversikt over enheter og tema de behandler
                </Normaltekst>
            </a>
        </LenkeNorgStyle>
    );
}

function Dokumentgruppe({gruppe, harTilgang}: DokumentGruppeProps) {
    const dokumentKomponenter = gruppe.array.map(dokument => (
        <DokumentKomponent
            dokument={dokument}
            harTilgang={harTilgang}
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

function hentNorg2Url(baseUrlsResponse: BaseUrlsResponse) {
    return hentBaseUrl(baseUrlsResponse, 'norg2-frontend');
}

function sakstemaSomKommaseparertListe(sakstema: Sakstema) {
    if (sakstema.temakode !== 'ALLE') {
        return sakstema.temakode;
    }
    const temaArray: string[] = sakstema.dokumentMetadata.reduce(
        (acc: string[], dok: DokumentMetadata) => {
            const tema = dok.temakode;
            if (acc.indexOf(tema) > -1) {
                return acc;
            } else {
                return [...acc, tema];
            }
        },
        []
    );
    return temaArray.join();
}

function filterAvsender(avsender: Entitet, avsenderfilter: AvsenderFilter) {
    switch (avsender) {
        case Entitet.Sluttbruker:
            return avsenderfilter.bruker;
        case Entitet.Nav:
            return avsenderfilter.nav;
        default:
            return avsenderfilter.andre;
    }
}

function DokumenterVisning(props: Props) {
    if (!props.sakstema) {
        return <b>Ingen saker</b>;
    }

    const filtrerteDokumenter = props.sakstema.dokumentMetadata.filter(metadata =>
        filterAvsender(metadata.avsender, props.avsenderFilter));

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

    const harTilgang = props.sakstema.harTilgang;

    const årsgrupper = dokumenterGruppert.map((gruppe: ArrayGroup<DokumentMetadata>) =>
        <Dokumentgruppe gruppe={gruppe} harTilgang={harTilgang} key={gruppe.category}/>
    );

    const temakodeTilNorgoppslag = sakstemaSomKommaseparertListe(props.sakstema);

    const checkboxer = (
        <>
            <Checkbox
                label={'Bruker'}
                checked={props.avsenderFilter.bruker}
                onChange={() => props.toggleFilter('bruker')}
            />
            <Checkbox
                label={'NAV'}
                checked={props.avsenderFilter.nav}
                onChange={() => props.toggleFilter('nav')}
            />
            <Checkbox
                label={'Andre'}
                checked={props.avsenderFilter.andre}
                onChange={() => props.toggleFilter('andre')}
            />
        </>
    );

    return (
        <Wrapper>
            <Header>
                <LenkeWrapper>
                    {lenkeNorg(temakodeTilNorgoppslag, hentNorg2Url(props.baseUrlsResponse))}
                </LenkeWrapper>
                <Form>
                    {checkboxer}
                </Form>
            </Header>
            <DokumenterArticle>
                <DokumenterListe>
                    {årsgrupper}
                </DokumenterListe>
            </DokumenterArticle>
        </Wrapper>
    );
}

export default DokumenterVisning;