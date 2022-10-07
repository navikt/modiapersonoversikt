export interface MerkRequestMedBehandlingskjede {
    fnr: string;
    behandlingsidListe: string[];
}

export interface SendTilSladdingRequest {
    fnr: string;
    traadId?: string;
    meldingId?: Array<string>;
    aarsak?: string;
}

export interface MerkLukkTraadRequest {
    fnr: string;
    saksbehandlerValgtEnhet: string;
    traadId: string;
    oppgaveId?: string;
}

export interface AvsluttGosysOppgaveRequest {
    fnr: string;
    oppgaveid: string;
    beskrivelse: string;
    saksbehandlerValgtEnhet?: string;
}
