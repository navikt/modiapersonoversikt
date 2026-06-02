interface Umami {
    track(payload?: unknown): void;
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

    // Denne er også i bruk i internflatedekoratøren
    // Siden vi ikke tracker automatisk så må vi legge på event på lenker i dekoratøren
    lenkeKlikket = 'lenke klikket',
    brukerEndret = 'bruker endret',
    enhetEndret = 'enhet endret',
    toggleNyModia = 'toggle ny modia',
    journalfor = 'journalfør',
    opprettOppgave = 'opprett oppgave',
    merkDialog = 'merk dialog',
    skrivUt = 'skriv ut',
    sendNyMelding = 'send ny melding',
    fortsettDialog = 'fortsett dialog',
    brukStandardtekst = 'bruk standardtekst',
    brukAutofullfor = 'bruk autofullfør',
    eksternDyplenke = 'ekstern dyplenke',
    startNyMelding = 'start ny melding',
    startSvar = 'start svar',
    avbrytMelding = 'avbryt melding'
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

let _referrer = document.referrer;
let _url = window.location.origin + window.location.pathname;
export const setAnalyticsReferrer = (href: string) => {
    _referrer = href;
};

export const setAnalyticsUrl = (href: string) => {
    _url = href;
};

const getReferrer = (): string => _referrer;
const getUrl = (): string => _url;

// Sentralisert sjekk og kall til umami.track. Skal brukes for alle egnedefinerte events.
const trackEventUmami = (name: string, data?: Record<string, unknown>): void => {
    if (!window.umami) {
        console.warn('Umami is not initialized. Ignoring');
        return;
    }

    window.umami.track((payload: unknown) => ({
        ...(payload as Record<string, unknown>),
        url: getUrl(),
        data,
        name
    }));
};

/*Denne tracker "generelt" besøk på siden, altså hver gang en ny link klikkes på og siden besøkes.
Brukes kun i usePageTracking og sørger for at kun 1 besøk blir tracket per sidevisning (etter redirects).
De andre funksjonene er ment for å tracke spesifikke events som ikke nødvendigvis trigger en sidevisning, f.eks klikk på en fane, åpning av dialog osv.
Ved f.eks endring av faner så blir det gjort to kall til umami, ett for besøket og ett for hendelsen "fane endret".
NB: setAnalyticsReferrer må alltid kalles før denne funksjonen, slik at _referrer er korrekt satt.*/
export const trackBesokUmami = () => {
    if (!window.umami) {
        console.warn('Umami is not initialized. Ignoring');
        return;
    }

    window.umami.track((payload: unknown) => ({
        ...(payload as Record<string, unknown>),
        referrer: getReferrer(),
        url: getUrl()
    }));
};

export const trackFaneEndret = (nyFane: string, forrigefane: string) => {
    trackEventUmami(trackingEvents.faneEndret, { nyFane, forrigefane });
};
export const trackDyplenkeFraEksternKilde = (tekst: string) => {
    trackEventUmami(trackingEvents.eksternDyplenke, { tekst });
};

export const trackFortsettDialog = (traadType: string) => {
    trackEventUmami(trackingEvents.fortsettDialog, { traadType });
};

export const trackSendNyMelding = (traadType: string) => {
    trackEventUmami(trackingEvents.sendNyMelding, { traadType });
};

export const trackGenereltUmamiEvent = (eventNavn: trackingEvents, payload?: Record<string, unknown>) => {
    trackEventUmami(eventNavn, payload);
};

export const trackToggleNyModia = (erPaaNyModia: boolean) => {
    trackEventUmami(trackingEvents.toggleNyModia, { tekst: erPaaNyModia ? 'på' : 'av' });
};

export const trackBrukerEndret = () => {
    trackEventUmami(trackingEvents.brukerEndret);
};

export const trackFilterEndret = (fane: string, type: filterType) => {
    trackEventUmami(trackingEvents.filterEndret, {
        fane: fane.toLowerCase(),
        filterType: type
    });
};

export const trackExpansionCardApnet = (name: string) => {
    trackEventUmami(trackingEvents.expansionCardApnet, { tittel: name });
};

export const trackExpansionCardLukket = (name: string) => {
    trackEventUmami(trackingEvents.expansionCardLukket, { tittel: name });
};

// Bruker denne til å tracke klikk på detaljvisning i ulike faner
// F.eks vise enkelt ytelse, åpne et dokument i sakerfanen, åpner detalj om utbetaling osv
export const trackVisDetaljvisning = (fane: string, tekst: string) => {
    trackEventUmami(trackingEvents.detaljvisningKlikket, { fane, tekst });
};

export const trackAccordionOpened = (name: string) => {
    trackEventUmami(trackingEvents.accordionApnet, { tittel: name });
};

export const trackAccordionClosed = (name: string) => {
    trackEventUmami(trackingEvents.accordionLukket, { tittel: name });
};

export const trackEnhetEndret = () => {
    trackEventUmami(trackingEvents.enhetEndret);
};

// Ved bruk av Umami identify vil alle påfølgende umami event knyttes til enhet.
// Da kan vi gruppere bruk av appen basert på kontor
export const identifyEnhetOgTypeUmami = (enhet: string, type: string) => {
    if (!window.umami) {
        console.warn('Umami is not initialized. Ignoring');
        return;
    }
    window.umami.identify({ enhet: enhet.toLowerCase(), type: type.toLowerCase() });
};
