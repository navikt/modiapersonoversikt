export interface GsakTema {
    kode: string;
    tekst: string;
    oppgavetyper: GsakTemaOppgavetype[];
    prioriteter: GsakTemaPrioritet[];
    underkategorier: GsakTemaUnderkategori[];
}

export interface GsakTemaOppgavetype {
    kode: string;
    tekst: string;
    dagerFrist: number;
}

export interface GsakTemaPrioritet {
    kode: string;
    tekst: string;
}

export interface GsakTemaUnderkategori {
    kode: string;
    tekst: string;
    erGyldig: boolean;
}

export interface Oppgave {
    oppgaveId: string;
    fnr: string;
    erSTOOppgave: boolean;
    traadId?: string;
}

export interface OpprettOppgaveRequest {
    fnr: string;
    opprettetavenhetsnummer: string;
    valgtEnhetId?: string;
    behandlingskjedeId: string;
    dagerFrist?: number;
    ansvarligIdent?: string;
    beskrivelse: string;
    temaKode: string;
    underkategoriKode?: string;
    oppgaveTypeKode: string;
    prioritetKode: string;
    ansvarligEnhetId: string;
}

export interface OpprettSkjermetOppgaveRequest {
    fnr: string;
    ansvarligIdent?: string;
    beskrivelse: string;
    temaKode: string;
    underkategoriKode?: string;
    oppgaveTypeKode: string;
    prioritetKode: string;
    opprettetavenhetsnummer: string;
}

export interface Enhet {
    enhetId: string;
    enhetNavn: string;
    status: string;
}

export interface Ansatt {
    fornavn: string;
    etternavn: string;
    ident: string;
}
