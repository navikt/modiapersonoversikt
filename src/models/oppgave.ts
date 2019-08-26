export interface Oppgave {
    oppgaveid: string;
    fødselsnummer: string;
    henvendelseid: string;
}

interface LeggTilbakeOppgaveBaseRequest {
    type: string; // fungerer kun som discriminant for typescript (Discriminated union)
    oppgaveId: string;
}

interface LeggTilbakeOppgaveInnhabilRequest extends LeggTilbakeOppgaveBaseRequest {
    type: 'innhabil';
}

interface LeggTilbakeOppgaveFeilTemaRequest extends LeggTilbakeOppgaveBaseRequest {
    type: 'feiltema';
    temagruppe: string;
}

export function erLeggTilbakeOppgaveFeilTemaRequest(
    payload: LeggTilbakeOppgaveRequest
): payload is LeggTilbakeOppgaveFeilTemaRequest {
    return 'temagruppe' in payload;
}

interface LeggTilbakeOppgaveAnnenAarsakRequest extends LeggTilbakeOppgaveBaseRequest {
    type: 'annenaarsak';
    beskrivelse: string;
}

export type LeggTilbakeOppgaveRequest =
    | LeggTilbakeOppgaveInnhabilRequest
    | LeggTilbakeOppgaveFeilTemaRequest
    | LeggTilbakeOppgaveAnnenAarsakRequest;
