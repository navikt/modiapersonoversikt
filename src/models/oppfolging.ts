export interface Oppfolging {
    erUnderOppfølging: boolean;
    veileder: null | Saksbehandler;
    enhet: AnsattEnhet;
}

export interface Saksbehandler {
    ident: string;
    navn: string;
}

export interface AnsattEnhet {
    id: string;
    navn: string;
    status: string;
}

export interface DetaljertOppfolging {
    oppfølging: Oppfolging;
    meldeplikt: boolean;
    formidlingsgruppe: string;
    innsatsgruppe: string;
    sykemeldtFra: string;
    rettighetsgruppe: string;
    vedtaksdato: string;
    sykefraværsoppfølging: SyfoPunkt[];
    ytelser: OppfolgingsYtelse[];
}

export interface SyfoPunkt {
    dato: string;
    fastOppfølgingspunkt: boolean;
    status: string;
    syfoHendelse: string;
}

export interface OppfolgingsYtelse {
    dagerIgjen: number;
    ukerIgjen: number;
    datoKravMottatt: string;
    fom: null | string;
    tom: null | string;
    status: string;
    type: string;
    vedtak: OppfolgingsVedtak[];
}

export interface OppfolgingsVedtak {
    aktivFra: string;
    aktivTil: string;
    aktivitetsfase?: string;
    vedtakstatus: string;
    vedtakstype: string;
}
