import styled from 'styled-components';
import { theme } from '../styles/personOversiktTheme';

const AppWrapper = styled.div`
    height: 100vh;
    @media print {
        height: auto;
    }
    display: flex;
    flex-flow: column nowrap;
    background-color: ${theme.color.bakgrunn};
    .visually-hidden {
        ${theme.visuallyHidden}
    }
    .ekspanderbartPanel__innhold {
        padding: 0;
    }
    .ekspanderbartPanel__hode:hover {
        ${theme.hover}
    }
`;

export const ContentStyle = styled.div`
    height: 0; // IE11-hack for at flex skal funke
    @media print {
        height: auto;
    }
    flex-grow: 1;
    display: flex;
    overflow: auto;
`;

export default AppWrapper;
