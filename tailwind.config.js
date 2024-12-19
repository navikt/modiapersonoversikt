import akselTw from '@navikt/ds-tailwind';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.tsx'],
    darkMode: ['selector', '[data-theme="dark"]'],
    theme: {
        extend: {
            colors: {
                'bg-default': 'var(--a-bg-default)',
                'surface-subtle': 'var(--a-surface-subtle)'
            }
        }
    },
    presets: [akselTw],
    plugins: []
};
