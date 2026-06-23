import SakIkkeTilgangIkon from 'src/svg/SakIkkeTilgangIkon';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';

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
