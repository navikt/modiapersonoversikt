import type { Sakstema } from 'src/generated/modiapersonoversikt-api';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';

export const SVGStyling = styled.span`
    svg {
        height: ${theme.margin.px30};
        width: ${theme.margin.px30};
        opacity: 0.5;
    }
`;

export function filtrerSakstemaerUtenDataV2(sakstemaer: Sakstema[]): Sakstema[] {
    return sakstemaer;
}
