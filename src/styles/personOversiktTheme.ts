import { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
    from { opacity: 0 }
`;

const oneRemInPx = 16;

export function pxToRem(px: number): string {
    return `${px / oneRemInPx}rem`;
}

const hover = css`
    box-shadow:
        inset 0 0 0 0.1rem #0067c5,
        0 0.1rem 0.1rem rgba(0, 0, 0, 0.2);
`;

const navFarger = {
    navLysGra: '#e9e7e7',
    navGra20: '#c6c2bf',
    navGra40: '#b7b1a9',
    navGra60: '#78706a',
    navGra80: '#59514b',
    navMorkGra: '#3e3832',
    fokusFarge: '#254b6d',
    orangeFokus: '#ffbd66',
    pinkErrorBg: '#f3e3e3',
    redError: '#ba3a26',
    navRod: '#C30000'
};

const focusOnRelativeParent = css`
    outline: none;
    box-shadow: none;
    &::after {
        position: absolute;
        top: 0;
        left: 0;
        content: '';
        box-shadow: inset 0 0 0 ${pxToRem(3)} ${navFarger.fokusFarge};
        height: 100%;
        width: 100%;
        pointer-events: none;
    }
`;

const theme = {
    color: {
        ...navFarger,
        lenkeSelected: '#005b82',
        lenkeHover: navFarger.navGra20,
        lenke: '#0067c5',
        bakgrunn: navFarger.navGra40,
        kategori: '#cce1f3',
        ytelser: '#d6897d',
        graaSkrift: '#645f5a',
        objektlisteHover: 'rgba(102, 203, 236, 0.18)',
        objektlisteActive: 'rgba(102, 203, 236, 0.35)'
    },
    graattPanel: css`
        border-radius: ${pxToRem(8)};
        background-color: #f1f0f0;
        box-shadow:
            inset 0 0 0 0.3rem white,
            inset 0 0 0 0.37rem rgba(0, 0, 0, 0.15);
        padding: ${pxToRem(20)};
    `,
    media: {
        smallScreen: 'max-width: 35rem',
        wideScreen: 'min-width: 35rem',
        utbetalinger: {
            minWidth: `${83 * 16}px`,
            maxWidth: `${83 * 16 - 1}px`
        }
    },
    margin: {
        layout: '.5rem',
        px50: pxToRem(50),
        px40: pxToRem(40),
        px30: pxToRem(30),
        px20: pxToRem(20),
        px10: pxToRem(10)
    },
    borderRadius: {
        layout: '.25rem;',
        knapp: '.35rem;'
    },
    border: {
        skille: `solid ${pxToRem(1)} ${navFarger.navGra60}`,
        skilleSvak: `solid ${pxToRem(1)} ${navFarger.navGra40};`
    },
    animation: {
        fadeIn: css`
            animation: ${fadeIn} 0.3s ease-out;
        `
    },
    focus: css`
        outline: none;
        box-shadow: 0 0 0 ${pxToRem(3)} ${navFarger.fokusFarge};
    `,
    focusInset: css`
        outline: none;
        box-shadow: inset 0 0 0 ${pxToRem(3)} ${navFarger.fokusFarge};
    `,
    focusOverlay: css`
        position: relative;
        ${focusOnRelativeParent};
    `,
    focusOnRelativeParent: focusOnRelativeParent,
    hover: hover,
    visuallyHidden: css`
        position: absolute !important;
        height: 1px;
        width: 1px;
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
            box-shadow: 0 0 0 ${pxToRem(3)} ${navFarger.fokusFarge};
        }
    `,
    highlight: css`
        background-color: #eed28c;
        box-shadow: 0 0 0 0.2rem #eed28c;
        border-radius: ${pxToRem(10)};
    `,
    visitedLinkPurple: css`
        a:visited:not(:focus) {
            color: purple; // Mange brukere har etterspurt en visuell markering på at et dokument/lenke har vært åpnet
        }
    `
};

export default theme;
