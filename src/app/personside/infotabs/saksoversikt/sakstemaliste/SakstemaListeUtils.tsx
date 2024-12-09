import { Normaltekst } from 'nav-frontend-typografi';
import styled from 'styled-components';
import { Behandlingsstatus, type SakstemaSoknadsstatus } from '../../../../../models/saksoversikt/sakstema';
import theme from '../../../../../styles/personOversiktTheme';
import SakIkkeTilgangIkon from '../../../../../svg/SakIkkeTilgangIkon';

export const SVGStyling = styled.span`
    svg {
        height: ${theme.margin.px30};
        width: ${theme.margin.px30};
        opacity: 0.5;
    }
`;

export function visAntallSakerSomHarbehandlingsstatusV2(
    sakstema: SakstemaSoknadsstatus,
    sjekkMotStatus: Behandlingsstatus,
    status: string
) {
    let antallUnderbehandling = 0;

    if (sjekkMotStatus === Behandlingsstatus.Avbrutt) {
        antallUnderbehandling = sakstema.soknadsstatus.avbrutt;
    } else if (sjekkMotStatus === Behandlingsstatus.FerdigBehandlet) {
        antallUnderbehandling = sakstema.soknadsstatus.ferdigBehandlet;
    } else if (sjekkMotStatus === Behandlingsstatus.UnderBehandling) {
        antallUnderbehandling = sakstema.soknadsstatus.underBehandling;
    }

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
    }
    return <SakIkkeTilgangIkon />;
}

export function filtrerSakstemaerUtenDataV2(sakstemaer: SakstemaSoknadsstatus[]): SakstemaSoknadsstatus[] {
    return sakstemaer.filter(
        (sakstema) =>
            sakstema.soknadsstatus.avbrutt > 0 ||
            sakstema.soknadsstatus.ferdigBehandlet > 0 ||
            sakstema.soknadsstatus.underBehandling > 0 ||
            sakstema.dokumentMetadata.length > 0
    );
}
