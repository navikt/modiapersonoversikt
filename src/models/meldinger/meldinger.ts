export interface Traad {
    traadId: string;
    meldinger: Melding[];
}

export interface Melding {
    id: string;
    oppgaveId?: string;
    meldingstype: Meldingstype;
    temagruppe: Temagruppe;
    skrevetAv: Saksbehandler;
    journalfortAv?: Saksbehandler;
    journalfortDato?: string;
    journalfortTema?: string;
    journalfortTemanavn?: string;
    journalfortSaksid?: string;
    fritekst: string;
    lestDato?: string;
    status: LestStatus;
    opprettetDato: string;
    ferdigstiltDato?: string;
    erFerdigstiltUtenSvar: boolean;
    ferdigstiltUtenSvarAv?: Saksbehandler;
    kontorsperretEnhet?: string;
    kontorsperretAv?: Saksbehandler;
    markertSomFeilsendtAv?: Saksbehandler;
    erDokumentMelding: boolean;
}

export interface Saksbehandler {
    fornavn: string;
    etternavn: string;
    ident?: string;
}

export enum TypeKontakt {
    Telefon = 'telefon',
    Oppmøte = 'oppmote',
    Oppgave = 'oppgave',
    Dokument = 'dokument',
    Monolog = 'monolog',
    MonologUbesvart = 'monlog ubesvart',
    Dialog = 'dialog',
    DialogBesvart = 'dialog besvart'
}

export enum Temagruppe {
    Uføretrygd = 'UFRT',
    Familie = 'FMLI',
    Hjelpemiddel = 'HJLPM',
    Bil = 'BIL',
    OrtopediskHjelpemiddel = 'ORT_HJE',
    Øvrig = 'OVRG',
    PleiepengerBarnsSykdom = 'PLEIEPENGERSY',
    Utland = 'UTLAND',
    Pensjon = 'PENS',
    Arbeid = 'ARBD',
    AndreSosiale = 'ANSOS',
    ØkonomiskSosial = 'OKSOS',
    Null = ''
}

export enum Meldingstype {
    DOKUMENT_VARSEL = 'DOKUMENT_VARSEL',
    OPPGAVE_VARSEL = 'OPPGAVE_VARSEL',
    SPORSMAL_SKRIFTLIG = 'SPORSMAL_SKRIFTLIG',
    SPORSMAL_SKRIFTLIG_DIREKTE = 'SPORSMAL_SKRIFTLIG_DIREKTE',
    SVAR_SKRIFTLIG = 'SVAR_SKRIFTLIG',
    SVAR_OPPMOTE = 'SVAR_OPPMOTE',
    SVAR_TELEFON = 'SVAR_TELEFON',
    DELVIS_SVAR_SKRIFTLIG = 'DELVIS_SVAR_SKRIFTLIG',
    SAMTALEREFERAT_OPPMOTE = 'SAMTALEREFERAT_OPPMOTE',
    SAMTALEREFERAT_TELEFON = 'SAMTALEREFERAT_TELEFON',
    SPORSMAL_MODIA_UTGAAENDE = 'SPORSMAL_MODIA_UTGAAENDE',
    SvarSblInngående = 'SVAR_SBL_INNGAAENDE'
}

export enum LestStatus {
    IkkeLest = 'IKKE_LEST_AV_BRUKER',
    Lest = 'LEST_AV_BRUKER',
    IkkeBesvart = 'IKKE_BESVART'
}

export interface SendReferatRequest {
    fritekst: string;
    temagruppe: string;
    meldingstype: Meldingstype.SAMTALEREFERAT_TELEFON | Meldingstype.SAMTALEREFERAT_OPPMOTE;
}

export interface SendSpørsmålRequest {
    fritekst: string;
    saksID: string;
    erOppgaveTilknyttetAnsatt: boolean;
}

export interface ForsettDialogRequest {
    traadId: string;
    behandlingsId: string;
    fritekst: string;
    saksId?: string;
    erOppgaveTilknyttetAnsatt: boolean;
    meldingstype: Meldingstype;
    oppgaveId?: string;
}

export interface SendDelsvarRequest {
    traadId: string;
    behandlingsId: string;
    fritekst: string;
    temagruppe: string;
    oppgaveId: string;
}

export interface OpprettHenvendelseRequest {
    traadId: string;
}

export interface OpprettHenvendelseResponse {
    behandlingsId: string;
    oppgaveId?: string;
}

export interface SlaaSammenRequest {
    meldinger: SlaaSammenMelding[];
    temagruppe: string;
}

export interface SlaaSammenMelding {
    oppgaveId: string;
    meldingsId: string;
    henvendelsesId: string;
}

export interface SlaaSammenResponse {
    nyTraadId: string;
    traader: Traad[];
}
