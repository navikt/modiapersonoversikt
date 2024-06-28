import styled from 'styled-components';
import { theme } from '../../styles/personOversiktTheme';

const StartBildeLayout = styled.div`
    padding: 5rem;
    display: flex;
    flex-grow: 1;
    flex-wrap: wrap;
    flex-flow: column;
    align-items: center;
    ${theme.animation.fadeIn};
    overflow: auto;
    > button {
        min-width: 25rem;
    }
    > * {
        margin-bottom: 1.5rem;
    }
`;

export default StartBildeLayout;
