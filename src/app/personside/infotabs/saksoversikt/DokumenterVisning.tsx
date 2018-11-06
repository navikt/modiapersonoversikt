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
import { BaseUrlsResponse } from '../../../../models/baseurls';
import { hentBaseUrl } from '../../../../redux/restReducers/baseurls';
import { AvsenderFilter } from './SaksoversiktContainer';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import { sakstemakodeAlle } from './SakstemaVisning';

interface Props {
    sakstema?: Sakstema;
    baseUrlsResponse: BaseUrlsResponse;
    avsenderFilter: AvsenderFilter;
    toggleFilter: (key: keyof AvsenderFilter) => void;
}

interface DokumentGruppeProps {
    gruppe: ArrayGroup<DokumentMetadata>;
    harTilgang: boolean;
    sakstemakode: string;
}

const Header = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 0px ${theme.margin.px10};
  > * {
    padding: ${theme.margin.px10};
  }
  > *:first-child {
        flex-grow: 1;
    }
`;

const DokumenterArticle = styled.article`
  background-color: white;
  border-radius: ${theme.borderRadius.layout};
  margin-top: ${theme.margin.layout};
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

const LenkeWrapper = styled.div`
  display: flex;
  flex-direction: column;
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

function hentNorg2Url(baseUrlsResponse: BaseUrlsResponse) {
    return hentBaseUrl(baseUrlsResponse, 'norg2-frontend');
}

function byggSøkestrengTilNorgTemaOppslag(sakstema: Sakstema) {
    if (sakstema.temakode !== sakstemakodeAlle) {
        return sakstema.temakode;
    }
    const temaArray: string[] = sakstema.dokumentMetadata.reduce(
        (acc: string[], dok: DokumentMetadata) => {
            const tema = dok.temakode;
            if (acc.includes(tema)) {
                return acc;
            } else {
                return [...acc, tema];
            }
        },
        []
    );
    return temaArray.join();
}

function hentRiktigAvsenderfilter(avsender: Entitet, avsenderfilter: AvsenderFilter) {
    switch (avsender) {
        case Entitet.Sluttbruker:
            return avsenderfilter.fraBruker;
        case Entitet.Nav:
            return avsenderfilter.fraNav;
        default:
            return avsenderfilter.fraAndre;
    }
}

function hentDokumentinnhold(sakstema: Sakstema, avsenderFilter: AvsenderFilter) {
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

    const harTilgang = sakstema.harTilgang;

    const årsgrupper = dokumenterGruppert.map((gruppe: ArrayGroup<DokumentMetadata>) =>
        (
            <Dokumentgruppe
                gruppe={gruppe}
                harTilgang={harTilgang}
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

function DokumenterVisning(props: Props) {
    if (!props.sakstema) {
        return null;
    }

    const checkboxer = (
        <>
            <Checkbox
                label={'Bruker'}
                checked={props.avsenderFilter.fraBruker}
                onChange={() => props.toggleFilter('fraBruker')}
            />
            <Checkbox
                label={'NAV'}
                checked={props.avsenderFilter.fraNav}
                onChange={() => props.toggleFilter('fraNav')}
            />
            <Checkbox
                label={'Andre'}
                checked={props.avsenderFilter.fraAndre}
                onChange={() => props.toggleFilter('fraAndre')}
            />
        </>
    );

    const temakodeTilNorgoppslag = byggSøkestrengTilNorgTemaOppslag(props.sakstema);
    const dokumentinnhold = hentDokumentinnhold(props.sakstema, props.avsenderFilter);

    return (
        <div>
            <Header>
                <LenkeWrapper>
                    <Undertittel>Saksdokumenter</Undertittel>
                    {lenkeNorg(temakodeTilNorgoppslag, hentNorg2Url(props.baseUrlsResponse))}
                </LenkeWrapper>
                <Form>
                    {checkboxer}
                </Form>
            </Header>
            {dokumentinnhold}
        </div>
    );
}

export default DokumenterVisning;