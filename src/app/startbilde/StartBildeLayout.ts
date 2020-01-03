import styled from 'styled-components/macro';
import { theme } from '../../styles/personOversiktTheme';

const StartBildeLayout = styled.div`
    margin-top: 7em;
    display: flex;
    flex-grow: 1;
    flex-flow: column wrap;
    align-items: center;
    ${theme.animation.fadeIn};
    > * {
        margin-bottom: 2em;
        min-width: 20em;
    }
`;

export default StartBildeLayout;
