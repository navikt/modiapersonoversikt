import styled, { createGlobalStyle } from 'styled-components/macro';
import { pxToRem, theme } from '../styles/personOversiktTheme';

const AppStyle = styled.div`
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
        box-shadow: 0 0 0 ${pxToRem(8)} ${theme.color.pinkErrorBg}, 0 0 0 ${pxToRem(9)} ${theme.color.redError};
    }
    .spinner {
        flex: 0 0 auto;
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

export const MacStyling = createGlobalStyle`
        *::-webkit-scrollbar {
            -webkit-appearance: none;
            width: ${pxToRem(7)};
            height: ${pxToRem(7)};
            background-color: #0004;
        }
        *::-webkit-scrollbar-thumb {
            border-radius: ${pxToRem(4)};
            background-color: #0005;
        }
`;

export const IE11Styling = createGlobalStyle`
        .alertstripe__tekst {
            flex: auto !important;
        }
`;

export default AppStyle;
