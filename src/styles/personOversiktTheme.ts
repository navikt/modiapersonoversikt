import { keyframes } from 'styled-components';

const fadeIn = keyframes`
    from { opacity: 0 }
`;

const oneRemInPx = 16;

function pxToRem(px: number): string {
    return px / oneRemInPx + 'rem';
}

export const theme = {
    color: {
        lenkeSelected: '#66CBEC',
        lenkeHover: '#C6C2BF',
        lenke: '#0067c5',
        bakgrunn: '#e7e9e9',
        kategori: '#9bd0b0',
        objektlisteHover: 'rgba(102, 203, 236, 0.18)',
        objektlisteActive: 'rgba(102, 203, 236, 0.35)'
    },
    ekspandert: `
        border-radius: ${pxToRem(4)};
        background-color: #f4f4f4;
        box-shadow: inset 0 0 0 1px #59514b;
        padding: ${pxToRem(20)};
        margin: ${pxToRem(20)} 0 0;
    `,
    media: {
        smallScreen: 'max-width: 35rem',
        wideScreen: 'min-width: 35rem'
    },
    margin: {
        layout: '.8rem',
        px50: pxToRem(50),
        px40: pxToRem(40),
        px30: pxToRem(30),
        px20: pxToRem(20),
        px10: pxToRem(10),
        px2: pxToRem(2),
        px1: pxToRem(1)
    },
    boxShadow: {
        layout: '0 0.1rem 0.6rem rgba(150, 150, 150, 0.7)'
    },
    borderRadius: {
        layout: '.25rem;',
        knapp: '.35rem;'
    },
    border: {
        skille: `solid ${pxToRem(1)} #59514b;`,
        skilleSvak: `solid ${pxToRem(1)} #b7b1a9;`
    },
    animation: {
        fadeIn: `${fadeIn} .2s ease-out`
    },
    focus: 'outline: none; box-shadow: 0 0 0 0.1875rem #FFBD66;',
    visuallyHidden: `
        position: absolute !important;
        height: 1px; width: 1px;
        overflow: hidden;
        clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
        clip: rect(1px, 1px, 1px, 1px);
    `
};

export default theme;
