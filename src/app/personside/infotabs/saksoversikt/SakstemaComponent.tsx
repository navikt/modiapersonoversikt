import * as React from 'react';
import { Behandlingsstatus, Sakstema } from '../../../../models/saksoversikt/sakstema';
import styled from 'styled-components';
import { theme } from '../../../../styles/personOversiktTheme';
import HoyreChevron from 'nav-frontend-chevron/lib/hoyre-chevron';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import SakIkkeTilgangIkon from '../../../../svg/SakIkkeTilgangIkon';
import Element from 'nav-frontend-typografi/lib/element';
import { hentFormattertDatoForSisteHendelse } from './saksoversiktUtils';
import { sakstemakodeAlle } from './SakstemaVisning';

interface Props {
    sakstema: Sakstema;
    erValgtSakstema: boolean;
    oppdaterSakstema: (sakstema: Sakstema) => void;
}

const Knapp = styled.button`
  border: none;
  padding: 0;
  height: 1.2rem;
  width: 1.2rem;
  border-radius: 0.5em;
  cursor: pointer;
  background-color: transparent;
  &:focus {
    ${theme.focus}
  }
`;

const KnappWrapper = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-top: .3rem;
    height: ${theme.margin.px30};
    width: ${theme.margin.px30};
  }
`;

const Wrapper = styled<{valgt: boolean}, 'li'>('li')`
    display: flex;
    cursor: pointer;
    ${props => props.valgt && 'background-color: rgba(0, 0, 0, 0.03);'}
    &:hover {
      background-color: ${theme.color.objektlisteHover};
    }
    &:active {
      background-color: ${theme.color.objektlisteActive};
    }
    > *:first-child {
        flex-grow: 1;
    }
`;

function visAntallSakerSomHarBehandlingsstatus(sakstema: Sakstema, sjekkMotStatus: Behandlingsstatus, status: string) {
    const antallUnderbehandling = sakstema.behandlingskjeder
        .filter(behandlingskjede => behandlingskjede.status === sjekkMotStatus).length;

    // Skal ikke vises på det aggregerte sakstemaet
    if (antallUnderbehandling === 0 || sakstema.temakode === sakstemakodeAlle) {
        return null;
    }

    const soknad = antallUnderbehandling === 1 ? 'søknad' : 'søknader';
    return <Normaltekst>{antallUnderbehandling} {soknad} er {status}.</Normaltekst>;
}

function saksikon(harTilgang: boolean) {
    if (harTilgang) {
        return null;
    } else {
        return <SakIkkeTilgangIkon/>;
    }
}

function SakstemaComponent(props: Props) {
    const sakerUnderBehandling = visAntallSakerSomHarBehandlingsstatus(
        props.sakstema, Behandlingsstatus.UnderBehandling, 'under behandling');
    const sakerFerdigBehandlet = visAntallSakerSomHarBehandlingsstatus(
        props.sakstema, Behandlingsstatus.FerdigBehandlet, 'ferdig behandlet');

    return (
        <Wrapper valgt={props.erValgtSakstema} onClick={() => props.oppdaterSakstema(props.sakstema)}>
            <div>
                <Normaltekst>{hentFormattertDatoForSisteHendelse(props.sakstema)}</Normaltekst>
                <Element>{props.sakstema.temanavn}</Element>
                {sakerUnderBehandling}
                {sakerFerdigBehandlet}
            </div>
            <KnappWrapper>
                {saksikon(props.sakstema.harTilgang)}
                <Knapp onClick={() => props.oppdaterSakstema(props.sakstema)}>
                    <HoyreChevron stor={true}/>
                </Knapp>
            </KnappWrapper>
        </Wrapper>
    );
}

export default SakstemaComponent;