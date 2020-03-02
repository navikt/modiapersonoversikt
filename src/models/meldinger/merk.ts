export interface MerkRequestMedBehandlingskjede {
    fnr: string;
    behandlingsidListe: string[];
}

export interface MerkRequestMedTraadId {
    fnr: string;
    eldsteMeldingTraadId: string;
}

export interface MerkKontorsperrRequest {
    enhet: string;
    meldingsidListe: string[];
}

export interface MerkAvsluttUtenSvarRequest {
    fnr: string;
    saksbehandlerValgtEnhet?: string;
    eldsteMeldingTraadId?: string;
    eldsteMeldingOppgaveId?: string;
}

export interface AvsluttGosysOppgaveRequest {
    fnr: string;
    oppgaveid: string;
    beskrivelse: string;
    saksbehandlerValgtEnhet?: string;
}
