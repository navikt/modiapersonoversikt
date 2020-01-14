import { createGlobalStyle } from 'styled-components';
import theme, { pxToRem } from '../styles/personOversiktTheme';

const GlobalStyling = createGlobalStyle`
    body {
      background-color: ${theme.color.bakgrunn};
    }
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

export default GlobalStyling;
