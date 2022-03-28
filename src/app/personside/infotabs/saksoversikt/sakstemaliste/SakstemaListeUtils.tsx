import * as React from 'react';
import { Behandlingsstatus, Sakstema } from '../../../../../models/saksoversikt/sakstema';
import { Normaltekst } from 'nav-frontend-typografi';
import SakIkkeTilgangIkon from '../../../../../svg/SakIkkeTilgangIkon';
import styled from 'styled-components/macro';
import theme from '../../../../../styles/personOversiktTheme';

export const SVGStyling = styled.span`
    svg {
        height: ${theme.margin.px30};
        width: ${theme.margin.px30};
        opacity: 0.5;
    }
`;

export function visAntallSakerSomHarBehandlingsstatus(
    sakstema: Sakstema,
    sjekkMotStatus: Behandlingsstatus,
    status: string
) {
    const antallUnderbehandling = sakstema.behandlingskjeder.filter(
        (behandlingskjede) => behandlingskjede.status === sjekkMotStatus
    ).length;

    if (antallUnderbehandling === 0) {
        return null;
    }

    const soknad = antallUnderbehandling === 1 ? 'søknad' : 'søknader';
    return (
        <Normaltekst className="metadata">
            {antallUnderbehandling} {soknad} er {status}.
        </Normaltekst>
    );
}

export function saksikon(harTilgang: boolean) {
    if (harTilgang) {
        return null;
    } else {
        return <SakIkkeTilgangIkon />;
    }
}
