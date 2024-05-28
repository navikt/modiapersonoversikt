/// <reference types="vitest" />
import { ConfigEnv, defineConfig, Plugin } from 'vite';

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

const gcpEntrypoint = (): Plugin => {
    let config: ConfigEnv;

    return {
        name: 'html-transform',
        configResolved(resolvedConfig) {
            config = resolvedConfig;
        },
        transformIndexHtml(html: string) {
            if (config.mode === 'dev-gcp') {
                return html.replace(
                    /<script unleash[\s\w\W]*?<\/script>/,
                    `
    <script unleash toggles="modiapersonoversikt.decorator-v3">
      const applicationFeatureToggles = {
          useNewDecorator: true,
          enableFaro: true
      };
      window.applicationFeatureToggles = applicationFeatureToggles;
    </script>`
                );
            }
        }
    };
};

export default defineConfig({
    base: process.env.LOCAL_TOKEN ? '/' : '/modiapersonoversikt/',
    server: {
        port: 3000,
        proxy: {
            '/proxy': {
                target: 'https://modiapersonoversikt.intern.dev.nav.no',
                changeOrigin: true,
                headers: {
                    Authorization: `Bearer ${process.env.LOCAL_TOKEN}`
                }
            },
            '/modiapersonoversikt-draft': {
                target: 'wss://modiapersonoversikt-draft.intern.dev.nav.no',
                changeOrigin: true
            }
        }
    },
    plugins: [
        react(),
        vitePluginSvgr({
            include: '**/*.svg'
        }),
        viteRequire(),
        gcpEntrypoint()
    ],
    build: {
        target: 'esnext',
        outDir: 'build',
        assetsDir: 'static',
        sourcemap: true
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
