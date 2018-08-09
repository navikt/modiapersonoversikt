import styled from 'styled-components';

const AppWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  background-color: ${(props) => props.theme.color.bakgrunn};
`;

export const Content = styled.div`
  height: 0; // IE 11 hack for at flex skal funke
  flex-grow: 1;
  display: flex;
`;

export default AppWrapper;
