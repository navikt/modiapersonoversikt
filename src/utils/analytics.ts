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

export const trackNavigation = (destination: string, linkText: string) => {
    if (!window.umami) {
        console.warn('Umami is not initialized. Ignoring');
        return;
    }
    window.umami.track('lenke klikket', {
        tekst: linkText,
        destinasjon: destination
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
