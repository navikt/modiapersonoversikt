declare global {
    interface Window {
        erChatvisning: boolean;
        applicationFeatureToggles: {
            useNewDecorator: string | boolean;
        };
    }
}

window.erChatvisning = (document.location.search + document.location.hash).includes('chatvisning');

// Bare for å gjøre TS happy
const dummy = {};
export default dummy;
