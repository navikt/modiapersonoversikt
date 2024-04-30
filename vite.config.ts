/// <reference types="vitest" />
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';
import vitePluginSvgr from 'vite-plugin-svgr';
import { fileURLToPath } from 'node:url';
import { viteRequire } from 'vite-require';

const fixNavFrontendStyle = (packages: string[]) =>
    packages.map((name) => ({
        find: new RegExp(`${name}$`),
        replacement: fileURLToPath(new URL(`node_modules/${name}/dist/main.css`, import.meta.url))
    }));

const fixNavFrontendStyleNoCss = (packages: string[]) =>
    packages.map((name) => ({
        find: new RegExp(`${name}`),
        replacement: fileURLToPath(new URL(`src/nav-style/${name}.css`, import.meta.url))
    }));

export default defineConfig({
    base: '/modiapersonoversikt/',
    server: {
        port: 3000
    },
    plugins: [
        react(),
        vitePluginSvgr({
            include: '**/*.svg'
        }),
        viteRequire()
    ],
    build: {
        target: 'esnext',
        outDir: 'build',
        assetsDir: 'static'
    },
    define: {
        process: { env: {} }
    },
    resolve: {
        alias: [
            ...fixNavFrontendStyleNoCss(['nav-frontend-etiketter-style']),
            ...fixNavFrontendStyle([
                'nav-frontend-lenker-style',
                'nav-frontend-lukknapp-style',
                'nav-frontend-popover-style',
                'nav-frontend-alertstriper-style',
                'nav-frontend-snakkeboble-style',
                'nav-frontend-modal-style',
                'nav-frontend-hjelpetekst-style',
                'nav-frontend-knapper-style',
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
            {
                find: /^~(.+)/,
                replacement: '$1'
            },
            {
                find: '~react-day-picker',
                replacement: 'react-day-picker'
            },
            {
                find: '~nav-frontend-core',
                replacement: 'nav-frontend-core'
            },
            {
                find: 'styled-components/macro',
                replacement: 'styled-components'
            }
        ]
    },
    test: {
        globals: true,
        environment: 'jsdom',
        environmentOptions: {
            jsdom: {
                url: 'http://localhost'
            }
        },
        setupFiles: './src/setupTests.ts',
        css: {
            modules: {
                classNameStrategy: 'non-scoped'
            }
        }
    }
});
