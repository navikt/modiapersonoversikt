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
    dagerIgjenMedBortfall: number;
    ukerIgjenMedBortfall: number;
    datoKravMottatt: string;
    fom?: string;
    tom?: string;
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
