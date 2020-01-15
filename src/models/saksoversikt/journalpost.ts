import { Baksystem, Saksdato } from './fellesSak';

export interface Journalpost {
    id: string;
    retning: Kommunikasjonsretning;
    dato: Saksdato;
    navn: string;
    journalpostId: string;
    hoveddokument: Dokument;
    vedlegg: Dokument[];
    avsender: Entitet;
    mottaker: Entitet;
    tilhørendeSaksid: string;
    tilhørendeFagsaksid: string;
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
    dokumentreferanse: string;
    kanVises: boolean;
    logiskDokument: boolean;
    skjerming: string | null;
}
