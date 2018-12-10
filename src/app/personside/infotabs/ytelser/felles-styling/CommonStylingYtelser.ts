import theme from '../../../../../styles/personOversiktTheme';
import styled from 'styled-components';

export const OversiktStyling = styled.div`
    margin: 0 ${theme.margin.px20} ${theme.margin.px20};
  > *:not(:first-child) {
    border-top: ${theme.border.skilleDashed};
  }
`;