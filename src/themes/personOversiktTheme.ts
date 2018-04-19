/* GLOBAL STYLING - STYLED COMPONENTS THEME */
import { keyframes } from 'styled-components';

const fadeIn = keyframes`
    from { opacity: 0 }
`;

export const personOversiktTheme = {
    color: {
        selectedLink: '#66CBEC',
        hoverLink: '#C6C2BF',
        lenke: 'rgb(0, 103, 197)',
        bakgrunn: '#efefef'
    },
    media: {
        smallScreen: 'max-width: 750px',
        wideScreen: 'min-width: 750px'
    },
    margin: {
        layout: '15px'
    },
    boxShadow: {
        layout: '0 0.1em 0.6em rgba(150, 150, 150, 0.7)'
    },
    borderRadius: {
        layout: '4px;'
    },
    animation: {
        fadeIn: `${fadeIn} .2s ease-out`
    }
};
