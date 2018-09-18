import * as React from 'react';
import { Behandlingskjede, Sakstema } from '../../../../models/saksoversikt/sakstema';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import SakstemaComponent from './SakstemaComponent';
import TittelOgIkon from '../../visittkort/body/IkonOgTittel';
import VergemålLogo from '../../../../svg/Utropstegn';
import { DokumentMetadata } from '../../../../models/saksoversikt/dokumentmetadata';
import { Sak } from '../../../../models/saksoversikt/sak';

export interface SakstemaProps {
    sakstema: Sakstema[];
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
    border-top: solid 2px ${theme.color.bakgrunn};
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

function GruppertTema(props: SakstemaProps) {
    const sakstemakomponenter = props.sakstema.filter(sakstema => (
        sakstema.behandlingskjeder.length > 0 || sakstema.dokumentMetadata.length > 0)).map(sakstema => (
            <SakstemaComponent sakstema={sakstema}/>
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

function aggregertSakstema(alleSakstema: Sakstema[]): Sakstema {
    let behandlingskjeder: Behandlingskjede[] = [];
    let dokumentmetadata: DokumentMetadata[] = [];
    let tilhørendeSaker: Sak[] = [];

    for (let sakstema of alleSakstema) {
        behandlingskjeder = behandlingskjeder.concat(sakstema.behandlingskjeder);
        dokumentmetadata = dokumentmetadata.concat(sakstema.dokumentMetadata);
        tilhørendeSaker = tilhørendeSaker.concat(sakstema.tilhorendeSaker);
    }

    return {
        temanavn: 'Alle saker',
        temakode: 'ALLE',
        harTilgang: true,
        behandlingskjeder: behandlingskjeder,
        dokumentMetadata: dokumentmetadata,
        tilhorendeSaker: tilhørendeSaker,
        erGruppert: false,
        feilkoder: []
    };
}

function Sakstema(props: SakstemaProps) {
    if (props.sakstema.length === 0) {
        return (
            <AlertStripeInfo>
                Det finnes ingen saker for bruker.
            </AlertStripeInfo>
        );
    }

    let sakstemaer = props.sakstema;
    let sakstema = aggregertSakstema(props.sakstema);
    sakstemaer.unshift(sakstema);

    return (
        <Wrapper>
            <TittelOgIkon tittel={'Saker'} ikon={<VergemålLogo/>} />
            <SakstemaListe>
                <GruppertTema sakstema={sakstemaer} />
            </SakstemaListe>
        </Wrapper>
    );
}

export default Sakstema;