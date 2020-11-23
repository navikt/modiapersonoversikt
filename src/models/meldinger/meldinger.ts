import { JournalforingsSak } from '../../app/personside/infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import { Temagruppe } from '../temagrupper';

export interface Traad {
    traadId: string;
    meldinger: Melding[];
}

export interface Melding {
    id: string;
    oppgaveId?: string;
    meldingstype: Meldingstype;
    temagruppe: Temagruppe | null;
    skrevetAvTekst: string;
    journalfortAv?: Saksbehandler;
    journalfortDato?: string;
    journalfortTema?: string;
    journalfortTemanavn?: string;
    journalfortSaksid?: string;
    fritekst: string;
    lestDato?: string;
    status: LestStatus;
    statusTekst?: string;
    opprettetDato: string;
    ferdigstiltDato?: string;
    erFerdigstiltUtenSvar: boolean;
    ferdigstiltUtenSvarAv?: Saksbehandler;
    kontorsperretEnhet?: string;
    kontorsperretAv?: Saksbehandler;
    markertSomFeilsendtAv?: Saksbehandler;
    erDokumentMelding: boolean;
    ferdigstiltUtenSvarDato?: string;
}

export interface Saksbehandler {
    fornavn: string;
    etternavn: string;
    ident?: string;
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
    SVAR_SBL_INNGAAENDE = 'SVAR_SBL_INNGAAENDE',
    INFOMELDING_MODIA_UTGAAENDE = 'INFOMELDING_MODIA_UTGAAENDE'
}

export enum LestStatus {
    IkkeLest = 'IKKE_LEST_AV_BRUKER',
    Lest = 'LEST_AV_BRUKER',
    IkkeBesvart = 'IKKE_BESVART'
}

export interface SendReferatRequest {
    fritekst: string;
    temagruppe: Temagruppe;
    meldingstype: Meldingstype.SAMTALEREFERAT_TELEFON | Meldingstype.SAMTALEREFERAT_OPPMOTE;
}

export interface SendSpørsmålRequest {
    fritekst: string;
    sak: JournalforingsSak;
    erOppgaveTilknyttetAnsatt: boolean;
}

export interface SendInfomeldingRequest {
    fritekst: string;
    sak: JournalforingsSak;
}

export interface ForsettDialogRequest {
    traadId: string;
    behandlingsId: string;
    fritekst: string;
    sak?: JournalforingsSak;
    erOppgaveTilknyttetAnsatt: boolean;
    meldingstype: Meldingstype;
    oppgaveId?: string;
}

export interface SendDelsvarRequest {
    traadId: string;
    behandlingsId: string;
    fritekst: string;
    temagruppe: Temagruppe;
    oppgaveId: string;
}

export interface OpprettHenvendelseRequest {
    traadId: string;
}

export interface OpprettHenvendelseResponse {
    behandlingsId: string;
    oppgaveId?: string;
}
