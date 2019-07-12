export interface RequestMedBehandlingskjede {
    behandlingsidListe: string[];
}

export interface RequestMedTraadId {
    eldsteMeldingTraadId: string;
}

export interface KontorsperrRequest {
    fnr: string;
    meldingsidListe: string[];
}

export interface AvsluttUtenSvarRequest {
    saksbehandlerValgtEnhet?: string;
    eldsteMeldingTraadId?: string;
    eldsteMeldingOppgaveId?: string;
}
