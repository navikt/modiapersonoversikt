import styled from 'styled-components';
import { pxToRem, theme } from '../styles/personOversiktTheme';

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
    .knapp {
        text-transform: none;
    }
    .skjema__feilomrade--harFeil {
        box-shadow: 0 0 0 ${pxToRem(8)} ${theme.color.pinkErrorBg}, 0 0 0 ${pxToRem(9)} ${theme.color.redError}55;
    }
`;

export const ContentStyle = styled.div`
    height: 0; // IE11-hack for at flex skal funke
    @media print {
        height: auto;
    }
    flex-grow: 1;
    display: flex;
`;

export default AppWrapper;
