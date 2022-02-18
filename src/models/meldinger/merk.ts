export interface MerkRequestMedBehandlingskjede {
    fnr: string;
    behandlingsidListe: string[];
}

export interface MerkKontorsperrRequest {
    fnr: String;
    enhet: string;
    meldingsidListe: string[];
}

export interface AvsluttGosysOppgaveRequest {
    fnr: string;
    oppgaveid: string;
    beskrivelse: string;
    saksbehandlerValgtEnhet?: string;
}
