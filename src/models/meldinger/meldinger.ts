export interface Traad {
    traadId: string;
    temagruppe: Temagruppe;
    statusKlasse: StatusKlasse;
    dato: string;
    meldinger: Melding[];
}

export interface Melding {
    id: string;
    temagruppe: Temagruppe;
    skrevetAv: Saksbehandler;
    journalfortAv: Saksbehandler;
    fritekst: string;
    lestDato?: string;
    status: LestStatus;
    opprettetDato: string;
    journalfortDato: string;
    ferdigstiltDato: string;
}

export interface Saksbehandler {
    navn: string;
    ident: string;
}

export enum StatusKlasse {
    Telefon = 'telefon',
    Oppmøte = 'oppmote',
    Monolog = 'momolog'
}

export enum Temagruppe {
    Uføretrygd = 'UFRT',
    Pensjon = 'PENS',
    Arbeid = 'ARBD'
}

export enum LestStatus {
    IkkeLest = 'IKKE_LEST_AV_BRUKER',
    Lest = 'LEST_AV_BRUKER'
}
