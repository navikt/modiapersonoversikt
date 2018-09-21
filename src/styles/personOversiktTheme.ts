import { keyframes } from 'styled-components';

const fadeIn = keyframes`
    from { opacity: 0 }
`;

export const theme = {
    color: {
        selectedLink: '#66CBEC',
        hoverLink: '#C6C2BF',
        lenke: 'rgb(0, 103, 197)',
        bakgrunn: '#efefef'
    },
    media: {
        smallScreen: 'max-width: 550px',
        wideScreen: 'min-width: 550px'
    },
    margin: {
        layout: '.8rem',
        px50: '3.125rem',
        px40: '2.5rem',
        px20: '1.25rem',
        px10: '.6rem'
    },
    boxShadow: {
        layout: '0 0.1em 0.6em rgba(150, 150, 150, 0.7)'
    },
    borderRadius: {
        layout: '4px;',
        knapp: '8px;'
    },
    animation: {
        fadeIn: `${fadeIn} .2s ease-out`
    },
    focus: 'outline: none; box-shadow: 0 0 0px 3px #FFBD66;',
    visuallyHidden: `
        position: absolute !important;
        height: 1px; width: 1px;
        overflow: hidden;
        clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
        clip: rect(1px, 1px, 1px, 1px);
    `
};

export default theme;
