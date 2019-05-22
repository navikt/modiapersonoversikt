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

export enum OppgavePrioritet {
    HOY = 'HOY',
    NORM = 'NORM',
    LAV = 'LAV'
}

export interface OpprettOppgaveRequest {
    valgtEnhetId: string;
    henvendelseId: string;
    dagerFrist: number;
    ansvarligIdent?: string;
    beskrivelse: string;
    temakode: string;
    underkategorikode?: string;
    brukerid: string;
    oppgaveTypeKode: string;
    prioritetKode: string;
}
