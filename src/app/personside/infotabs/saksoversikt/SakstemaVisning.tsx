import * as React from 'react';
import { Sakstema } from '../../../../models/saksoversikt/sakstema';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import SakstemaComponent from './SakstemaComponent';
import TittelOgIkon from '../../visittkort/body/IkonOgTittel';
import { Undertittel } from 'nav-frontend-typografi';
import SaksIkon from '../../../../svg/SaksIkon';
import { hentDatoForSisteHendelse, hentFormattertDatoForSisteHendelse } from './saksoversiktUtils';

export interface SakstemaProps {
    sakstema: Sakstema[];
    oppdaterSakstema: (sakstema: Sakstema) => void;
    valgtSakstema?: Sakstema;
}

interface State {
    aggregertSakstema: Sakstema;
}

const GruppeStyle = styled.li`
  ol > *:first-child {
    padding: 20px 10px 20px 10px;
  }
  ol {
    padding: 0;
    margin: 0;
  }
  ol > *:not(:first-child) {
    border-top: ${theme.border.skille};
    padding: 20px 10px 20px 10px;
  }
`;

const SakstemaListe = styled.ol`
  padding: .2rem ${theme.margin.px10};
  margin: 0;
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
  padding: ${theme.margin.px20} ${theme.margin.px50};
  svg {
    height: ${theme.margin.px30};
    width: auto;
  }
`;

function GrupperteTema(props: SakstemaProps) {
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
        <GruppeStyle>
            <ol>
                {sakstemakomponenter}
            </ol>
        </GruppeStyle>
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
        temakode: 'ALLE',
        harTilgang: true,
        behandlingskjeder: alleBehandlingskjeder,
        dokumentMetadata: alleDokumentmetadata,
        tilhorendeSaker: alleTilhørendeSaker,
        erGruppert: false,
        feilkoder: []
    };
}

class SakstemaVisning extends React.Component<SakstemaProps, State> {

    constructor(props: SakstemaProps) {
        super(props);
        const aggregert = aggregertSakstema(props.sakstema);
        this.state = {
            aggregertSakstema: aggregert
        };
        this.props.oppdaterSakstema(aggregert);
    }

    render () {
        const sorterPåHendelse = (a: Sakstema, b: Sakstema) =>
            hentDatoForSisteHendelse(b).getTime() - hentDatoForSisteHendelse(a).getTime();
        const sortertSakstema = this.props.sakstema.sort(sorterPåHendelse);

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
                    <TittelOgIkon tittel={<Undertittel>Tema</Undertittel>} ikon={<SaksIkon/>}/>
                </TittelWrapper>
                <SakstemaListe>
                    <GrupperteTema
                        valgtSakstema={this.props.valgtSakstema}
                        sakstema={komplettListe}
                        oppdaterSakstema={this.props.oppdaterSakstema}
                    />
                </SakstemaListe>
            </Wrapper>
        );
    }
}

export default SakstemaVisning;