export interface Arbeidsforhold {
    arbeidsgiverNavn: string;
    arbeidsgiverKontonr: string | null;
    inntektsperiode: string | null;
    inntektForPerioden: number | null;
    sykepengerFom: string | null | undefined;
    refusjonTom: string | null;
    refusjonstype: string | null;
    arbeidsgiverOrgnr: string | null | undefined;
    arbeidskategori: string | null | undefined;
}
