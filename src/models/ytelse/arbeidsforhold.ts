export interface Arbeidsforhold {
    arbeidsgiverNavn: string;
    arbeidsgiverKontonr: string | null;
    inntektsperiode: string | null;
    inntektForPerioden: number | null;
    sykepengerFom: string | null;
    refusjonTom: string | null;
    refusjonstype: string | null;
}
