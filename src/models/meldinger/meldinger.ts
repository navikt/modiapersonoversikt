import type { JournalforingsSak } from 'src/app/personside/infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import type { Temagruppe } from '../temagrupper';

export interface Traad {
    traadId: string;
    traadType?: TraadType;
    temagruppe?: Temagruppe;
    meldinger: Melding[];
    journalposter: Array<MeldingJournalpost>;
    avsluttetDato?: string;
    sistEndretAv?: string;
}

export interface Melding {
    id: string;
    meldingsId: string;
    meldingstype: Meldingstype;
    temagruppe: Temagruppe | null;
    skrevetAvTekst: string;
    fritekst: string;
    lestDato?: string;
    status: LestStatus;
    opprettetDato: string;
    ferdigstiltDato?: string;
    avsluttetDato?: string;
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

interface Veileder {
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

export enum TraadType {
    SAMTALEREFERAT = 'SAMTALEREFERAT',
    MELDINGSKJEDE = 'MELDINGSKJEDE',
    CHAT = 'CHAT'
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

export interface OpprettHenvendelseRequestV2 {
    fnr: string;
    enhet: string;
    traadId: string;
}

export interface OpprettHenvendelseRequest {
    enhet: string;
    traadId: string;
}

export interface OpprettHenvendelseResponse {
    behandlingsId: string;
    oppgaveId?: string;
}

export interface SendMeldingRequest {
    traadId?: string;
    traadType: TraadType;
    enhet: string;
    fritekst: string;
    sak?: JournalforingsSak;
    temagruppe?: Temagruppe;
    erOppgaveTilknyttetAnsatt?: boolean;
    behandlingsId?: string;
    oppgaveId?: string;
    avsluttet?: boolean;
}

export interface SendMeldingRequestV2 {
    fnr: string;
    traadId?: string;
    traadType: TraadType;
    enhet: string;
    fritekst: string;
    sak?: JournalforingsSak;
    temagruppe?: Temagruppe;
    erOppgaveTilknyttetAnsatt?: boolean;
    behandlingsId?: string;
    oppgaveId?: string;
    avsluttet?: boolean;
}
