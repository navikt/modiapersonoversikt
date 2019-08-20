export interface Oppgave {
    oppgaveid: string;
    fødselsnummer: string;
    henvendelseid: string;
}

export interface LeggTilbakeOppgaveRequest {
    temagruppe?: string;
    beskrivelse?: string;
}
