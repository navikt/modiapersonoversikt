declare global {
    interface Window {
        erChatvisning: boolean;
    }
}

window.erChatvisning = (document.location.search + document.location.hash).includes('chatvisning');

export default {};
