import styled from 'styled-components';
import type { Sakstema } from '../../../../../models/saksoversikt/sakstema';
import theme from '../../../../../styles/personOversiktTheme';
import SakIkkeTilgangIkon from '../../../../../svg/SakIkkeTilgangIkon';

export const SVGStyling = styled.span`
    svg {
        height: ${theme.margin.px30};
        width: ${theme.margin.px30};
        opacity: 0.5;
    }
`;

export function saksikon(harTilgang: boolean) {
    if (harTilgang) {
        return null;
    }
    return <SakIkkeTilgangIkon />;
}

export function filtrerSakstemaerUtenDataV2(sakstemaer: Sakstema[]): Sakstema[] {
    return sakstemaer.filter((sakstema) => sakstema.dokumentMetadata.length > 0);
}
