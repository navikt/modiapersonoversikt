import * as React from 'react';
import { Behandlingsstatus, Sakstema } from '../../../../../models/saksoversikt/sakstema';
import styled from 'styled-components';
import { theme } from '../../../../../styles/personOversiktTheme';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import SakIkkeTilgangIkon from '../../../../../svg/SakIkkeTilgangIkon';
import { hentFormattertDatoForSisteHendelse } from '../utils/saksoversiktUtils';
import VisMerKnapp from '../../../../../components/VisMerKnapp';
import { sakstemakodeAlle } from './SakstemaListe';
import { erValgtIDyplenke, SakerDyplenkeRouteComponentProps, useInfotabsDyplenker } from '../../dyplenker';
import { withRouter } from 'react-router';

interface Props extends SakerDyplenkeRouteComponentProps {
    sakstema: Sakstema;
}

const SVGStyling = styled.span`
    svg {
        height: ${theme.margin.px30};
        width: ${theme.margin.px30};
    }
`;

const UUcustomOrder = styled.div`
    display: flex;
    flex-direction: column;
    .order-first {
        order: 0;
    }
    .order-second {
        order: 1;
    }
`;

const Flex = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

function visAntallSakerSomHarBehandlingsstatus(sakstema: Sakstema, sjekkMotStatus: Behandlingsstatus, status: string) {
    const antallUnderbehandling = sakstema.behandlingskjeder.filter(
        behandlingskjede => behandlingskjede.status === sjekkMotStatus
    ).length;

    // Skal ikke vises på det aggregerte sakstemaet
    if (antallUnderbehandling === 0 || sakstema.temakode === sakstemakodeAlle) {
        return null;
    }

    const soknad = antallUnderbehandling === 1 ? 'søknad' : 'søknader';
    return (
        <Normaltekst>
            {antallUnderbehandling} {soknad} er {status}.
        </Normaltekst>
    );
}

function saksikon(harTilgang: boolean) {
    if (harTilgang) {
        return null;
    } else {
        return <SakIkkeTilgangIkon />;
    }
}

function SakstemaListeElement(props: Props) {
    const dyplenker = useInfotabsDyplenker();

    const sakerUnderBehandling = visAntallSakerSomHarBehandlingsstatus(
        props.sakstema,
        Behandlingsstatus.UnderBehandling,
        'under behandling'
    );
    const sakerFerdigBehandlet = visAntallSakerSomHarBehandlingsstatus(
        props.sakstema,
        Behandlingsstatus.FerdigBehandlet,
        'ferdig behandlet'
    );

    return (
        <li>
            <VisMerKnapp
                valgt={erValgtIDyplenke.saker(props.sakstema, props)}
                linkTo={dyplenker.saker.link(props.sakstema)}
                ariaDescription={'Vis ' + props.sakstema.temanavn}
            >
                <Flex>
                    <div>
                        <UUcustomOrder>
                            <Element className="order-second">{props.sakstema.temanavn}</Element>
                            <Normaltekst className="order-first">
                                {hentFormattertDatoForSisteHendelse(props.sakstema)}
                            </Normaltekst>
                        </UUcustomOrder>
                        {sakerUnderBehandling}
                        {sakerFerdigBehandlet}
                    </div>
                    <SVGStyling>{saksikon(props.sakstema.harTilgang)}</SVGStyling>
                </Flex>
            </VisMerKnapp>
        </li>
    );
}

export default withRouter(SakstemaListeElement);
