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

export enum trackingEvents {
    detaljvisningKlikket = 'detaljvisning klikket',
    accordionApnet = 'accordion åpnet',
    accordionLukket = 'accordion lukket',
    filterEndret = 'filter endret',
    expansionCardApnet = 'expansion card åpnet',
    expansionCardLukket = 'expansion card lukket',
    faneEndret = 'fane endret',
    lenkeKlikketFraOversikt = 'linke klikket fra oversikt',
    hotkeyBrukt = 'hotkey brukt',

    // denne er i bruk i internflatedekoratøren, ikke bruk her
    lenkeKlikket = 'lenke klikket'
}

export enum filterType {
    DATO_RADIO = 'dato radio',
    DATO_EGENDEFINERT = 'dato egendefinert',
    TYPE = 'type',
    YTELSE_TYPE = 'ytelsetype',
    STATUS = 'status',
    SOK = 'søk',
    TEMA = 'tema'
}

export const trackFilterEndret = (fane: string, filterType: filterType) => {
    if (!window.umami) {
        console.warn('Umami is not initialized. Ignoring');
        return;
    }
    window.umami.track(trackingEvents.filterEndret, {
        fane: fane.toLowerCase(),
        filterType: filterType
    });
};

export const trackExpansionCardApnet = (name: string) => {
    if (!window.umami) {
        console.warn('Umami is not initialized. Ignoring');
        return;
    }
    window.umami.track(trackingEvents.expansionCardApnet, {
        tittel: name
    });
};

export const trackExpansionCardLukket = (name: string) => {
    if (!window.umami) {
        console.warn('Umami is not initialized. Ignoring');
        return;
    }
    window.umami.track(trackingEvents.expansionCardLukket, {
        tittel: name
    });
};

// Bruker denne til å tracke klikk på detaljvisning i ulike faner
// F.eks vise enkelt ytelse, åpne et dokument i sakerfanen, åpner detalj om utbetaling osv
export const trackVisDetaljvisning = (fane: string, tekst: string) => {
    if (!window.umami) {
        console.warn('Umami is not initialized. Ignoring');
        return;
    }
    window.umami.track(trackingEvents.detaljvisningKlikket, {
        fane: fane,
        tekst: tekst
    });
};

export const trackAccordionOpened = (name: string) => {
    if (!window.umami) {
        console.warn('Umami is not initialized. Ignoring');
        return;
    }
    window.umami.track(trackingEvents.accordionApnet, {
        tittel: name
    });
};

export const trackAccordionClosed = (name: string) => {
    if (!window.umami) {
        console.warn('Umami is not initialized. Ignoring');
        return;
    }
    window.umami.track(trackingEvents.accordionLukket, {
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
