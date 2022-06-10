import { JournalforingsSak } from '../../app/personside/infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import { Temagruppe } from '../temagrupper';

export interface Traad {
    traadId: string;
    meldinger: Melding[];
    journalposter: Array<MeldingJournalpost>;
}

export interface Melding {
    id: string;
    meldingstype: Meldingstype;
    temagruppe: Temagruppe | null;
    skrevetAvTekst: string;
    fritekst: string;
    lestDato?: string;
    status: LestStatus;
    opprettetDato: string;
    ferdigstiltDato?: string;
    avsluttetDato?: string;
    kontorsperretEnhet?: string;
    kontorsperretAv?: Saksbehandler;
    sendtTilSladding: boolean;
    markertSomFeilsendtAv?: Saksbehandler;
}

export interface MeldingJournalpost {
    journalfortAv?: Veileder;
    journalfortDato: string;
    journalfortTema: string;
    journalfortTemanavn: string;
    journalfortSaksid?: string;
}

export interface Veileder {
    ident: string;
    navn: string;
}

export interface Saksbehandler {
    fornavn: string;
    etternavn: string;
    ident?: string;
}

export enum Meldingstype {
    SPORSMAL_SKRIFTLIG = 'SPORSMAL_SKRIFTLIG',
    SVAR_SKRIFTLIG = 'SVAR_SKRIFTLIG',
    SAMTALEREFERAT_OPPMOTE = 'SAMTALEREFERAT_OPPMOTE',
    SAMTALEREFERAT_TELEFON = 'SAMTALEREFERAT_TELEFON',
    SPORSMAL_MODIA_UTGAAENDE = 'SPORSMAL_MODIA_UTGAAENDE',
    SVAR_SBL_INNGAAENDE = 'SVAR_SBL_INNGAAENDE',
    INFOMELDING_MODIA_UTGAAENDE = 'INFOMELDING_MODIA_UTGAAENDE',
    CHATMELDING_FRA_NAV = 'CHATMELDING_FRA_NAV',
    CHATMELDING_FRA_BRUKER = 'CHATMELDING_FRA_BRUKER'
}

export enum LestStatus {
    IkkeLest = 'IKKE_LEST_AV_BRUKER',
    Lest = 'LEST_AV_BRUKER',
    IkkeBesvart = 'IKKE_BESVART'
}

export interface SendReferatRequest {
    enhet: string;
    fritekst: string;
    temagruppe: Temagruppe;
    meldingstype: Meldingstype.SAMTALEREFERAT_TELEFON | Meldingstype.SAMTALEREFERAT_OPPMOTE;
}

export interface SendSporsmalRequest {
    enhet: string;
    fritekst: string;
    sak: JournalforingsSak;
    erOppgaveTilknyttetAnsatt: boolean;
}

export interface SendInfomeldingRequest {
    enhet: string;
    fritekst: string;
    sak: JournalforingsSak;
}

export interface ForsettDialogRequest {
    enhet: string;
    traadId: string;
    behandlingsId: string;
    fritekst: string;
    sak?: JournalforingsSak;
    erOppgaveTilknyttetAnsatt: boolean;
    meldingstype: Meldingstype;
    oppgaveId?: string;
}

export interface OpprettHenvendelseRequest {
    enhet: string;
    traadId: string;
}

export interface OpprettHenvendelseResponse {
    behandlingsId: string;
    oppgaveId?: string;
}
