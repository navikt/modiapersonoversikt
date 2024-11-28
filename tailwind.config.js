import akselTw from '@navikt/ds-tailwind';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.tsx'],
    theme: {
        extend: {}
    },
    presets: [akselTw],
    plugins: []
};
