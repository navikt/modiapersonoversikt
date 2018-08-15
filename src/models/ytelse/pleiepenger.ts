export interface PleiepengerResponse {
    pleiepenger: Pleiepengerettighet[] | null;
}

export interface Pleiepengerettighet {
    barnet: string;
    omsorgsperson: string;
    andreOmsorgsperson?: string;
    restDagerFomIMorgen: number;
    forbrukteDagerTomIDag: number;
    pleiepengedager: number;
    restDagerAnvist: number;
    perioder?: Pleiepengeperiode[];
}

export interface Pleiepengeperiode {
    fom: string;
    antallPleiepengedager: number;
    arbeidsforhold?: Arbeidsforhold[];
    vedtak?: Vedtak[];
}

export interface Arbeidsforhold {
    arbeidsgiverNavn: string;
    arbeidsgiverKontonr?: string;
    inntektsperiode?: string;
    inntektForPerioden?: number;
    refusjonTom?: string;
    refusjonstype?: string;
    arbeidsgiverOrgnr: string;
    arbeidskategori: string;
}

export interface Vedtak {
    periode: Periode;
    kompensasjonsgrad?: number;
    utbetalingsgrad: number;
    anvistUtbetaling: string;
    bruttobeløp: number;
    dagsats: number;
    pleiepengegrad?: number;
}

export interface Periode {
    fom: string;
    tom: string;
}