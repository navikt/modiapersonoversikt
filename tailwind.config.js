import akselTw from '@navikt/ds-tailwind';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.tsx'],
    darkMode: ['selector', '[data-theme="dark"]'],
    theme: {
        extend: {
            colors: {
                'bg-default': 'var(--a-bg-default)',
                'surface-subtle': 'var(--a-surface-subtle)',
                'bg-subtle': 'var(--a-bg-subtle)',
                'border-default': 'var(--a-border-default)',
                'border-subtle': 'var(--a-border-subtle)',
                'border-strong': 'var(--a-border-strong)',
                'border-divider': 'var(--a-border-divider)'
            }
        }
    },
    presets: [akselTw],
    plugins: []
};
