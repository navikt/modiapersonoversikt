import { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
    from { opacity: 0 }
`;

const oneRemInPx = 16;

export function pxToRem(px: number): string {
    return px / oneRemInPx + 'rem';
}

const hover = css`
    box-shadow: inset 0 0 0 0.1rem #0067c5, 0 0.1rem 0.1rem rgba(0, 0, 0, 0.2);
`;

export const theme = {
    color: {
        lenkeSelected: '#005b82',
        lenkeHover: '#C6C2BF',
        lenke: '#0067c5',
        dialogpanelBakgrunn: '#f1f2f2',
        bakgrunn: '#e9e7e7',
        kategori: '#cce1f3',
        ytelser: '#d6897d',
        gråSkrift: '#645f5a',
        objektlisteHover: 'rgba(102, 203, 236, 0.18)',
        objektlisteActive: 'rgba(102, 203, 236, 0.35)',
        morkGra: '#3E3832',
        navGra20: '#c6c2bf',
        orangeFocusLighten60: '#FFE5C2',
        navGra40: '#b7b1a9'
    },
    gråttPanel: css`
        border-radius: ${pxToRem(8)};
        background-color: #f1f0f0;
        box-shadow: inset 0 0 0 0.3rem white, inset 0 0 0 0.37rem rgba(0, 0, 0, 0.15);
        padding: ${pxToRem(20)};
    `,
    hvittPanel: css`
        border-radius: ${pxToRem(4)};
        background-color: white;
        box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.1);
    `,
    media: {
        smallScreen: 'max-width: 35rem',
        wideScreen: 'min-width: 35rem',
        utbetalinger: '80rem'
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
        skilleDashed: `dotted ${pxToRem(1.5)} #b7b1a9;`,
        skille: `solid ${pxToRem(1)} #b7b1a9;`,
        skilleSvak: `solid ${pxToRem(1)} #c6c2bf;`
    },
    animation: {
        fadeIn: css`
            animation: ${fadeIn} 0.3s ease-out;
        `
    },
    focus: css`
        outline: none;
        box-shadow: 0 0 0 ${pxToRem(3)} #254b6d;
    `,
    focusInset: css`
        outline: none;
        box-shadow: inset 0 0 0 ${pxToRem(3)} #254b6d;
    `,
    focusOverlay: css`
        position: relative;
        outline: none;
        &::after {
            position: absolute;
            top: 0;
            content: '';
            box-shadow: 0 0 0 ${pxToRem(3)} #254b6d;
            height: 100%;
            width: 100%;
            pointer-events: none;
        }
    `,
    hover: hover,
    visuallyHidden: `
        position: absolute !important;
        height: 1px; width: 1px;
        overflow: hidden;
        clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
        clip: rect(1px, 1px, 1px, 1px);
    `,
    resetEkspanderbartPanelStyling: css`
        .ekspanderbartPanel__innhold {
            padding: 0;
        }
        .ekspanderbartPanel__hode:hover {
            ${hover}
        }
    `,
    resetButtonStyle: css`
        border: none;
        cursor: pointer;
        background-color: transparent;
        &:focus {
            outline: none;
            box-shadow: 0 0 0 ${pxToRem(3)} #254b6d;
        }
    `
};

export default theme;
