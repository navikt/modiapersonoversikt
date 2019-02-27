import theme from '../../../../../styles/personOversiktTheme';
import styled from 'styled-components';

export const OversiktStyling = styled.div`
    margin: 0 ${theme.margin.px20} ${theme.margin.px20};
    display: flex;
    > * {
        margin: ${theme.margin.px20};
        flex-basis: 45%;
        flex-grow: 1;
    }
    > *:not(:first-child) {
        border-left: ${theme.border.skilleDashed};
        padding-left: ${theme.margin.px40};
        margin-left: 0;
    }
`;
