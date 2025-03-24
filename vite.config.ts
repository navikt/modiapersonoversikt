import path from 'node:path';
import type { IndexHtmlTransform, Plugin } from 'vite';
import { configDefaults } from 'vitest/config';
import { defineConfig } from 'vitest/config';

import { fileURLToPath } from 'node:url';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import vitePluginSvgr from 'vite-plugin-svgr';
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

const modiaFrontendCompat = (): {
    transformIndexHtml: IndexHtmlTransform;
} & Plugin => {
    return {
        name: 'modia-frontend-html-transform',
        transformIndexHtml(html, ctx) {
            if (ctx.server || process.env.VITE_GH_PAGES === 'true') {
                const removed = html.replace(/<slot environment="prod">((.|\s)*?)<\/slot>/, '');
                const content = removed.match(/<slot not-environment="prod">((.|\s)*?)<\/slot>/)?.[1];
                return removed.replace(/<slot not-environment="prod">((.|\s)*?)<\/slot>/, content ?? '');
            }
            return html;
        }
    };
};

export default defineConfig({
    base: process.env.VITE_APP_BASE_PATH || '/',
    server: {
        port: 3000,
        proxy: {
            '/proxy': {
                target: 'https://modiapersonoversikt.intern.dev.nav.no',
                changeOrigin: true,
                headers: {
                    Authorization: `Bearer ${process.env.LOCAL_TOKEN}`,
                    origin: 'modiapersonoversikt.intern.dev.nav.no'
                }
            },
            '/modiapersonoversikt-draft': {
                target: 'wss://modiapersonoversikt-draft.intern.dev.nav.no',
                changeOrigin: true
            }
        }
    },
    plugins: [
        TanStackRouterVite(),
        react(),
        vitePluginSvgr({
            include: '**/*.svg'
        }),
        viteRequire(),
        modiaFrontendCompat()
    ],
    build: {
        target: 'esnext',
        outDir: 'build',
        assetsDir: 'static',
        sourcemap: true,
        rollupOptions: {
            input: {
                main: 'index.html'
            }
        }
    },
    define: {
        process: { env: {} }
    },
    resolve: {
        alias: [
            {
                find: 'src',
                replacement: path.resolve(__dirname, 'src')
            },
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
                find: '~nav-frontend-core',
                replacement: 'nav-frontend-core'
            }
        ]
    },
    test: {
        exclude: [...configDefaults.exclude, 'e2e/*'],
        pool: 'threads',
        globals: true,
        environment: 'happy-dom',
        setupFiles: './src/setupTests.ts',
        css: {
            modules: {
                classNameStrategy: 'non-scoped'
            }
        }
    }
});
