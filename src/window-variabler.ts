declare global {
    interface Window {
        erChatvisning: boolean;
        applicationFeatureToggles: {};
    }
}

window.erChatvisning = (document.location.search + document.location.hash).includes('chatvisning');

// Bare for å gjøre TS happy
const dummy = {};
export default dummy;
