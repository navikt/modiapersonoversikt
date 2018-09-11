import { LocalDateTimeType } from '../../utils/localDateTimeUtils';
import { Baksystem } from './fellesEnum';

export interface DokumentMetadata {
    retning: Kommunikasjonsretning;
    dato: LocalDateTimeType;
    navn: string;
    journalpostId: string;
    hoveddokument: Dokument;
    vedlegg: Dokument[];
    avsender: Entitet;
    mottaker: Entitet;
    tilhorendeSakid: string;
    tilhorendeFagsakId: string;
    baksystem: Baksystem[];
    temakode: string;
    temakodeVisning: string;
    ettersending: boolean;
    erJournalfort: boolean;
    feilWrapper: FeilWrapper;
    kategoriNotat: KategoriNotat;
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
    feilmelding: Feilmelding;
}

export enum KategoriNotat {
    Forvaltningsnotat = 'FORVALTNINGSNOTAT',
    InterntNotat = 'INTERNT_NOTAT',
    Referat = 'REFERAT'
}

export interface Dokument {
    tittel: string;
    dokumentreferanse: string;
    kanVises: boolean;
    logiskDokument: boolean;
}