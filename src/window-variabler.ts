declare global {
    interface Window {
        erChatvisning: boolean;
        sfFullLockdown: boolean;
    }
}

window.erChatvisning = (document.location.search + document.location.hash).includes('chatvisning');
window.sfFullLockdown = true;

// Bare for å gjøre TS happy
const dummy = {};
export default dummy;
