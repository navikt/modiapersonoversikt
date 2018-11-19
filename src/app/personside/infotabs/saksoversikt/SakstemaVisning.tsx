import * as React from 'react';
import { Sakstema, SakstemaResponse } from '../../../../models/saksoversikt/sakstema';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import SakstemaComponent from './SakstemaComponent';
import { Undertittel } from 'nav-frontend-typografi';
import { hentDatoForSisteHendelse, hentFormattertDatoForSisteHendelse } from './saksoversiktUtils';

export const sakstemakodeAlle = 'ALLE';

const SakstemaListe = styled.ol`
  > * {
    border-top: ${theme.border.skille};
    padding: ${theme.margin.px20};
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
      padding: 10px;
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

const TittelWrapper = styled.div`
  padding: ${theme.margin.px20};
`;

export interface GrupperteTemaProps {
    sakstema: Sakstema[];
    oppdaterSakstema: (sakstema: Sakstema) => void;
    valgtSakstema?: Sakstema;
}

function GrupperteTema(props: GrupperteTemaProps) {
    const sakstemakomponenter = props.sakstema.filter(sakstema => (
        sakstema.behandlingskjeder.length > 0 || sakstema.dokumentMetadata.length > 0)).map(sakstema => (
            <SakstemaComponent
                erValgtSakstema={props.valgtSakstema === sakstema}
                sakstema={sakstema}
                oppdaterSakstema={props.oppdaterSakstema}
                key={sakstema.temakode + hentFormattertDatoForSisteHendelse(sakstema)}
            />
        )
    );
    return (
        <SakstemaListe>
            {sakstemakomponenter}
        </SakstemaListe>
    );
}

function aggregerSakstemaGenerisk<T>(alleSakstema: Sakstema[], getGeneriskElement: (saksTema: Sakstema) => T[]): T[] {
    return alleSakstema.reduce(
        (acc: T[], sakstema: Sakstema) => {
            return [...acc, ...getGeneriskElement(sakstema)];
        },
        []
    );
}

function aggregertSakstema(alleSakstema: Sakstema[]): Sakstema {
    const alleBehandlingskjeder = aggregerSakstemaGenerisk(alleSakstema, (sakstema => sakstema.behandlingskjeder));
    const alleDokumentmetadata = aggregerSakstemaGenerisk(alleSakstema, (sakstema => sakstema.dokumentMetadata));
    const alleTilhørendeSaker = aggregerSakstemaGenerisk(alleSakstema, (sakstema => sakstema.tilhorendeSaker));

    return {
        temanavn: 'Alle tema',
        temakode: sakstemakodeAlle,
        harTilgang: true,
        behandlingskjeder: alleBehandlingskjeder,
        dokumentMetadata: alleDokumentmetadata,
        tilhorendeSaker: alleTilhørendeSaker,
        erGruppert: false,
        feilkoder: []
    };
}

export interface SakstemaVisningProps {
    sakstemaResponse: SakstemaResponse;
    oppdaterSakstema: (sakstema: Sakstema) => void;
    valgtSakstema?: Sakstema;
}

interface State {
    aggregertSakstema: Sakstema;
}

class SakstemaVisning extends React.Component<SakstemaVisningProps, State> {

    constructor(props: SakstemaVisningProps) {
        super(props);
        const aggregert = aggregertSakstema(props.sakstemaResponse.resultat);
        this.state = {
            aggregertSakstema: aggregert
        };
        this.props.oppdaterSakstema(aggregert);
    }

    render() {
        const sorterPåHendelse = (a: Sakstema, b: Sakstema) =>
            hentDatoForSisteHendelse(b).getTime() - hentDatoForSisteHendelse(a).getTime();
        const sortertSakstema = this.props.sakstemaResponse.resultat.sort(sorterPåHendelse);

        if (sortertSakstema.length === 0) {
            return (
                <AlertStripeInfo>
                    Det finnes ingen saker for bruker.
                </AlertStripeInfo>
            );
        }

        const komplettListe = [this.state.aggregertSakstema, ...sortertSakstema];

        return (
            <Wrapper>
                <TittelWrapper>
                    <Undertittel>Tema</Undertittel>
                </TittelWrapper>
                <GrupperteTema
                    valgtSakstema={this.props.valgtSakstema}
                    sakstema={komplettListe}
                    oppdaterSakstema={this.props.oppdaterSakstema}
                />
            </Wrapper>
        );
    }
}

export default SakstemaVisning;