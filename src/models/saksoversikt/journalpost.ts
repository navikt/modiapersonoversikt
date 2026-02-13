import type { Baksystem } from './fellesSak';

export interface Journalpost {
    id: string;
    retning: Kommunikasjonsretning;
    dato: string;
    lestDato: string | null;
    navn: string;
    journalpostId: string | null;
    hoveddokument: Dokument;
    vedlegg: Dokument[];
    avsender: Entitet;
    mottaker: Entitet;
    tilhorendeSaksid: string;
    tilhorendeFagsaksid: string;
    baksystem: Baksystem[];
    temakode: string;
    temakodeVisning: string;
    ettersending: boolean;
    erJournalfort: boolean;
    feil: FeilWrapper;
}

export enum Kommunikasjonsretning {
    Inn = 'INN',
    Ut = 'UT',
    Intern = 'INTERN'
}

export enum Entitet {
    Sluttbruker = 'SLUTTBRUKER',
    Nav = 'NAV',
    EksternPart = 'EKSTERN_PART',
    Ukjent = 'UKJENT'
}

export enum Feilmelding {
    UkjentFeil = 'UKJENT_FEIL',
    DokumentIkkeFunnet = 'DOKUMENT_IKKE_FUNNET',
    DokumentIkkeTilgjengelig = 'DOKUMENT_IKKE_TILGJENGELIG',
    DokumentSlettet = 'DOKUMENT_SLETTET',
    Sikkerhetsbegrensning = 'SIKKERHETSBEGRENSNING',
    ManglerDokumentmetadata = 'MANGLER_DOKUMENTMETADATA',
    JournalfortAnnetTema = 'JOURNALFORT_ANNET_TEMA',
    IkkeJournalfortEllerAnnenBruker = 'IKKE_JOURNALFORT_ELLER_ANNEN_BRUKER',
    SaksbehandlerIkkeTilgang = 'SAKSBEHANDLER_IKKE_TILGANG',
    TemakodeErBidrag = 'TEMAKODE_ER_BIDRAG',
    KorruptPdf = 'KORRUPT_PDF',
    TekniskFeil = 'TEKNISK_FEIL'
}

export interface FeilWrapper {
    inneholderFeil: boolean;
    feilmelding: Feilmelding | null;
}

export interface Dokument {
    tittel: string;
    dokumentreferanse: string | null;
    logiskDokument: boolean;
    skjerming: string | null;
    dokumentStatus: DokumentStatus | null;
    saksbehandlerHarTilgang: boolean;
}

export enum DokumentStatus {
    UNDER_REDIGERING = 'UNDER_REDIGERING',
    FERDIGSTILT = 'FERDIGSTILT',
    AVBRUTT = 'AVBRUTT',
    KASSERT = 'KASSERT'
}
