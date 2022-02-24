export interface MerkRequestMedBehandlingskjede {
    fnr: string;
    behandlingsidListe: string[];
}

export interface AvsluttGosysOppgaveRequest {
    fnr: string;
    oppgaveid: string;
    beskrivelse: string;
    saksbehandlerValgtEnhet?: string;
}
