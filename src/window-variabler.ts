import { Faro } from '@grafana/faro-web-sdk';

declare global {
    interface Window {
        erChatvisning: boolean;
        applicationFeatureToggles: {
            enableFaro: string | boolean;
        };
        faro?: Faro;
    }
}

window.erChatvisning = (document.location.search + document.location.hash).includes('chatvisning');

// Bare for å gjøre TS happy
const dummy = {};
export default dummy;
