import styled from 'styled-components';
import { theme } from '../styles/personOversiktTheme';

const AppWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  background-color: ${theme.color.bakgrunn};
`;

export const Content = styled.div`
  height: 0; // IE11-hack for at flex skal funke
  flex-grow: 1;
  display: flex;
`;

export default AppWrapper;
