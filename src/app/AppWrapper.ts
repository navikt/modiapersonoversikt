import styled from 'styled-components';

const AppWrapper = styled.div`
  position: relative;
  height: 0; // IE11-hack for at flexbox skal virke
  min-height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  > #header {
    flex-grow: 0;
  }
`;

export default AppWrapper;
