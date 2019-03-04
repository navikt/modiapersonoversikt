import { Fødsel } from '../../models/ytelse/foreldrepenger';

export const statiskKommendeUtbetaling = {
    vedtak: { fra: '2018-01-14', til: '2017-07-15' },
    utbetalingsgrad: 79,
    utbetalingsdato: '2018-06-25',
    bruttobeløp: 466,
    arbeidsgiverNavn: 'Vedvik - Lunde',
    arbeidsgiverOrgNr: '1234567890',
    arbeidsgiverKontonr: '549801574',
    dagsats: 705,
    saksbehandler: 'Mari Johannessen',
    type: 'KONTOØVERFØRING'
};

export const statiskForeldrepengeMock: Fødsel = {
    forelder: '10108000398',
    andreForeldersFnr: '03063850003',
    antallBarn: 5,
    barnetsFødselsdato: '2019-02-11',
    dekningsgrad: 34,
    fedrekvoteTom: '2019-02-10',
    mødrekvoteTom: null,
    foreldrepengetype: 'Fødselspenger',
    graderingsdager: 55,
    restDager: 41,
    rettighetFom: '2017-11-21',
    eldsteIdDato: null,
    foreldreAvSammeKjønn: null,
    periode: [
        {
            fødselsnummer: '10108000398',
            harAleneomsorgFar: null,
            harAleneomsorgMor: null,
            arbeidsprosentMor: 58,
            avslagsårsak: 'Avslag',
            avslått: 'Avslått',
            disponibelGradering: 9,
            erFedrekvote: null,
            erMødrekvote: null,
            forskyvelsesårsak1: null,
            forskyvelsesperiode1: { fra: '2014-10-08T14:22:55.629Z', til: '2014-08-22T10:50:40.296Z' },
            forskyvelsesårsak2: null,
            forskyvelsesperiode2: { fra: '2014-12-09T16:29:21.344Z', til: '2014-08-26T10:23:03.605Z' },
            foreldrepengerFom: '2017-04-29',
            midlertidigStansDato: '2019-02-10',
            morSituasjon: 'nobis sit quo et quis',
            rettTilFedrekvote: 'Rett til fedrekvote',
            rettTilMødrekvote: 'Ingen rett til mødrekvote',
            stansårsak: 'Avsluttet',
            kommendeUtbetalinger: [statiskKommendeUtbetaling]
        }
    ],
    slutt: null,
    arbeidsforhold: [
        {
            arbeidsgiverNavn: 'Bakke - Solheim',
            arbeidsgiverKontonr: '35179178779',
            inntektsperiode: 'Månedlig',
            inntektForPerioden: 40062,
            sykepengerFom: '2019-02-10',
            refusjonTom: '2019-02-11',
            refusjonstype: 'Ikke refusjon'
        },
        {
            arbeidsgiverNavn: 'Bakke - Solheim',
            arbeidsgiverKontonr: '35179178779',
            inntektsperiode: 'Månedlig',
            inntektForPerioden: 40062,
            sykepengerFom: '2019-02-10',
            refusjonTom: '2019-02-11',
            refusjonstype: 'Ikke refusjon'
        }
    ],
    erArbeidsgiverperiode: null,
    arbeidskategori: 'Arbeidstaker',
    termin: '2019-02-11'
};
