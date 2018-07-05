import styled from 'styled-components';

const AppWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  background-color: ${(props) => props.theme.color.bakgrunn};
`;

export const Content = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
  display: flex;
`;

export default AppWrapper;
