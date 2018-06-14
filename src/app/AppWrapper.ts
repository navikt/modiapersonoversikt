import styled from 'styled-components';

const AppWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  background-color: ${(props) => props.theme.color.bakgrunn};
`;

export default AppWrapper;
