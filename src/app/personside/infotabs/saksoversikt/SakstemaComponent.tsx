import * as React from 'react';
import { Behandlingsstatus, Sakstema } from '../../../../models/saksoversikt/sakstema';
import styled from 'styled-components';
import { theme } from '../../../../styles/personOversiktTheme';
import HoyreChevron from 'nav-frontend-chevron/lib/hoyre-chevron';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import SakIkkeTilgangIkon from '../../../../svg/SakIkkeTilgangIkon';
import Element from 'nav-frontend-typografi/lib/element';
import { hentDatoForSisteHendelse } from './saksoversiktUtils';

interface Props {
    sakstema: Sakstema;
    valgtSakstema?: Sakstema;
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

const Wrapper = styled<{valgt: boolean}, 'div'>('div')`
    display: flex;
    cursor: pointer;
    ${props => props.valgt && 'background-color: rgba(0, 0, 0, 0.03);'}
    &:hover {
      background-color: rgba(102, 203, 236, 0.18);
    }
    &:active {
      background-color: rgba(102, 203, 236, 0.35);
    }
    > *:first-child {
        flex-grow: 1;
    }
`;

function tellUnderBehandling(sakstema: Sakstema) {
    const antallUnderbehandling = sakstema.behandlingskjeder
        .filter(behandlingskjede => behandlingskjede.status === Behandlingsstatus.UnderBehandling).length;

    if (antallUnderbehandling === 0 || sakstema.temakode === 'ALLE') {
        return null;
    }

    const soknad = antallUnderbehandling === 1 ? 'søknad' : 'søknader';
    return <Normaltekst>{antallUnderbehandling} {soknad} er under behandling.</Normaltekst>;
}

function tellFerdigBehandlet(sakstema: Sakstema) {
    const antallFerdigBehandlet = sakstema.behandlingskjeder
        .filter(behandlingskjede => behandlingskjede.status === Behandlingsstatus.FerdigBehandlet).length;

    if (antallFerdigBehandlet === 0 || sakstema.temakode === 'ALLE') {
        return null;
    }

    const soknad = antallFerdigBehandlet === 1 ? 'søknad' : 'søknader';
    return <Normaltekst>{antallFerdigBehandlet} {soknad} er ferdig behandlet.</Normaltekst>;
}

function saksikon(harTilgang: boolean) {
    if (harTilgang) {
        return null;
    } else {
        return <SakIkkeTilgangIkon/>;
    }
}

function SakstemaComponent(props: Props) {
    console.log(props.sakstema, props.valgtSakstema, props.sakstema === props.valgtSakstema);
    return (
        <Wrapper valgt={props.sakstema === props.valgtSakstema} onClick={() => props.oppdaterSakstema(props.sakstema)}>
            <div>
                <Normaltekst>{hentDatoForSisteHendelse(props.sakstema)}</Normaltekst>
                <Element>{props.sakstema.temanavn}</Element>
                {tellUnderBehandling(props.sakstema)}
                {tellFerdigBehandlet(props.sakstema)}
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