interface Umami {
    track(payload: unknown): void;
    track(event_name: string, payload: unknown): void;
    identify(session_data: unknown): void;
}

declare global {
    interface Window {
        umami?: Umami;
    }
}

// Bruker denne til å tracke klikk på detaljvisning i ulike faner
// F.eks vise enkelt ytelse, åpne et dokument i sakerfanen, åpner detalj om utbetaling osv
export const trackVisDetaljvisning = (fane: string, tekst: string) => {
    if (!window.umami) {
        console.warn('Umami is not initialized. Ignoring');
        return;
    }
    window.umami.track('detaljvisning klikket', {
        fane: fane,
        tekst: tekst
    });
};

export const trackAccordionOpened = (name: string) => {
    if (!window.umami) {
        console.warn('Umami is not initialized. Ignoring');
        return;
    }
    window.umami.track('accordion åpnet', {
        tittel: name
    });
};

export const trackAccordionClosed = (name: string) => {
    if (!window.umami) {
        console.warn('Umami is not initialized. Ignoring');
        return;
    }
    window.umami.track('accordion lukket', {
        tittel: name
    });
};

export const updateUserEnhet = (enhet: string) => {
    if (!window.umami) {
        console.warn('Umami is not initialized. Ignoring');
        return;
    }

    window.umami.identify({ enhet });
};
