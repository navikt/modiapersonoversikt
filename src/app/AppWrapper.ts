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
        box-shadow: 0 0 0 ${pxToRem(8)} ${theme.color.pinkErrorBg}, 0 0 0 ${pxToRem(9)} ${theme.color.redError};
    }
    &.is-mac {
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
    }
    &.is-ie {
        .alertstripe__tekst {
            flex: auto !important;
        }
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
