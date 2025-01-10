import type { Faro } from '@grafana/faro-web-sdk';

declare global {
    interface Window {
        erChatvisning: boolean;
        applicationFeatureToggles: {
            enableFaro: boolean;
        };
        __ENV__: Record<string, string>;
        faro?: Faro;
    }
}

window.erChatvisning = (document.location.search + document.location.hash).includes('chatvisning');

// Bare for å gjøre TS happy
const dummy = {};
export default dummy;
