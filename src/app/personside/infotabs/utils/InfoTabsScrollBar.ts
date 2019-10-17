import styled, { css } from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';

export const scrollBarContainerStyle = (minWidth: string) => css`
    @media (min-width: ${minWidth}) {
        max-height: 100%;
        max-width: 100%;
    }
`;

export const ScrollBar = styled.div`
    overflow: auto;
    max-height: 100%;
    padding: ${theme.margin.layout};
`;
