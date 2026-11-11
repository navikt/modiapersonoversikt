export enum SakKategori {
    FAG = 'Fagsaker',
    GEN = 'Generelle saker'
}

export interface JournalforingsSak {
    fagsystemKode: string;
    fagsystemNavn: string;
    fagsystemSaksId: string | null;
    opprettetDato: string | null;
    sakstype: string | null;
    temaKode: string;
    temaNavn: string;
}

export type Result = { saker: Array<JournalforingsSak>; feiledeSystemer: Array<string> };
export type Tema = { tema: string; saker: Array<JournalforingsSak> };
export type Kategorier = { [key in SakKategori]: Tema[] };
