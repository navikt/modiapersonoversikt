export interface Oppfolging {
    erUnderOppfolging: boolean;
    veileder: null | Saksbehandler;
    enhet: null | AnsattEnhet;
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
    oppfolging: Oppfolging | null;
    meldeplikt: boolean;
    formidlingsgruppe: string;
    innsatsgruppe: string;
    sykemeldtFra: string;
    rettighetsgruppe: string;
    vedtaksdato: string;
    sykefraværsoppfølging: SyfoPunkt[];
    ytelser: (OppfolgingsYtelse | Dagpenger)[];
}

export interface SyfoPunkt {
    dato: string;
    fastOppfølgingspunkt: boolean;
    status: string;
    syfoHendelse: string;
}

export interface OppfolgingsYtelse {
    datoKravMottatt: string;
    fom: null | string;
    tom: null | string;
    status: string;
    type: string;
    vedtak: OppfolgingsVedtak[];
    dagerIgjenMedBortfall: number;
    ukerIgjenMedBortfall: number;
}

export interface Dagpenger extends OppfolgingsYtelse {
    dagerIgjen: number;
    ukerIgjen: number;
    dagerIgjenPermittering: number;
    ukerIgjenPermittering: number;
    type: 'Dagpenger';
}

export function isDagpenger(oppfolgingsYtelse: OppfolgingsYtelse): oppfolgingsYtelse is Dagpenger {
    return oppfolgingsYtelse.type === 'Dagpenger';
}

export interface OppfolgingsVedtak {
    aktivFra: string;
    aktivTil: string;
    aktivitetsfase?: string;
    vedtakstatus: string;
    vedtakstype: string;
}

interface Gjeldende14aVedtak {
    innsatsgruppe: { kode: string; beskrivelse: string };
    hovedmal?: { kode: string; beskrivelse: string };
    fattetDato: string;
}

export interface Gjeldende14aVedtakResponse {
    gjeldende14aVedtak?: Gjeldende14aVedtak;
}
