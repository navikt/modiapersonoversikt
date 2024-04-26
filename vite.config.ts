import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';
import vitePluginSvgr from 'vite-plugin-svgr';
import { fileURLToPath } from 'node:url';
import replace from 'vite-plugin-filter-replace';

const fixNavFrontendStyle = (packages: string[]) =>
    packages.reduce(
        (config, name) => ({
            ...config,
            [name]: fileURLToPath(new URL(`node_modules/${name}/dist/main.css`, import.meta.url))
        }),
        {}
    );
export default defineConfig({
    base: '/modiapersonoversikt',
    plugins: [
        react(),
        vitePluginSvgr(),
        replace([
            {
                filter: /\.less$/,
                replace: {
                    from: /~/,
                    to: ''
                }
            }
        ])
    ],
    resolve: {
        alias: {
            ...fixNavFrontendStyle([
                'nav-frontend-lukknapp-style',
                'nav-frontend-lenker-style',
                'nav-frontend-popover-style',
                'nav-frontend-alertstriper-style',
                'nav-frontend-snakkeboble-style',
                'nav-frontend-modal-style',
                'nav-frontend-hjelpetekst-style',
                'nav-frontend-knapper-style',
                'nav-frontend-etiketter-style',
                'nav-frontend-spinner-style',
                'nav-frontend-stegindikator-style',
                'nav-frontend-typografi-style',
                'nav-frontend-chevron-style',
                'nav-frontend-paneler-style',
                'nav-frontend-lenkepanel-style',
                'nav-frontend-tabs-style',
                'nav-frontend-skjema-style',
                'nav-frontend-ekspanderbartpanel-style'
            ]),
            '~reacy-day-picker': 'react-day-picker'
        }
    }
});
