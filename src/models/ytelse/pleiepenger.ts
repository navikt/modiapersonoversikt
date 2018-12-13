export interface PleiepengerResponse {
    pleiepenger: Pleiepengerettighet[];
}

export interface Pleiepengerettighet {
    barnet: string;
    omsorgsperson: string;
    andreOmsorgsperson: string | null;
    restDagerFomIMorgen: number;
    forbrukteDagerTomIDag: number;
    pleiepengedager: number;
    restDagerAnvist: number;
    perioder: Pleiepengeperiode[];
}

export interface Pleiepengeperiode {
    fom: string;
    antallPleiepengedager: number;
    arbeidsforhold: Arbeidsforhold[];
    vedtak: Vedtak[];
}

export interface Arbeidsforhold {
    arbeidsgiverNavn: string;
    arbeidsgiverKontonr: string | null;
    inntektsperiode: string | null;
    inntektForPerioden: number | null;
    refusjonTom: string | null;
    refusjonstype: string | null;
    arbeidsgiverOrgnr: string;
    arbeidskategori: string;
}

export interface Vedtak {
    periode: Periode;
    kompensasjonsgrad: number | null;
    utbetalingsgrad: number;
    anvistUtbetaling: string;
    bruttobeløp: number;
    dagsats: number;
    pleiepengegrad: number | null;
}

export interface Periode {
    fom: string;
    tom: string;
}