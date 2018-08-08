export interface Oppfolging {
    erUnderOppfølging: boolean;
    veileder: Saksbehandler;
    enhet: AnsattEnhet;
}

export interface Saksbehandler {
    ident: string;
}

export interface AnsattEnhet {
    id: string;
    navn: string;
    status: string;
}