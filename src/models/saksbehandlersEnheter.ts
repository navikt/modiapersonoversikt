interface Enhet {
    navn: string;
    enhetId: string;
}

export interface SaksbehandlersEnheter {
    ident: string;
    enhetliste: Enhet[];
}
