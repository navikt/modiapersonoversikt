import * as React from 'react';
import { Behandlingsstatus, Sakstema } from '../../../../models/saksoversikt/sakstema';
import styled from 'styled-components';
import { theme } from '../../../../styles/personOversiktTheme';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import SakIkkeTilgangIkon from '../../../../svg/SakIkkeTilgangIkon';
import Element from 'nav-frontend-typografi/lib/element';
import { hentFormattertDatoForSisteHendelse } from './saksoversiktUtils';
import { sakstemakodeAlle } from './SakstemaListe';
import VisMerKnapp from '../../../../components/VisMerKnapp';

interface Props {
    sakstema: Sakstema;
    erValgtSakstema: boolean;
    oppdaterSakstema: (sakstema: Sakstema) => void;
}

const SVGStyling = styled.span`
    svg {
      height: ${theme.margin.px30};
      width: ${theme.margin.px30};
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
        <li>
            <VisMerKnapp
                valgt={props.erValgtSakstema}
                onClick={() => props.oppdaterSakstema(props.sakstema)}
                ariaDescription={'Vis ' + props.sakstema.temanavn}
            >
                <div>
                    <Normaltekst>{hentFormattertDatoForSisteHendelse(props.sakstema)}</Normaltekst>
                    <Element>{props.sakstema.temanavn}</Element>
                    {sakerUnderBehandling}
                    {sakerFerdigBehandlet}
                </div>
                <SVGStyling>
                    {saksikon(props.sakstema.harTilgang)}
                </SVGStyling>
            </VisMerKnapp>
        </li>
    );
}

export default SakstemaComponent;