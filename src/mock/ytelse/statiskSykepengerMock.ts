import type { Sykepenger } from '../../models/ytelse/sykepenger';
import { statiskKommendeUtbetaling } from './statiskForeldrepengeMock';

const arbeidsforhold = {
    arbeidsgiverNavn: 'Bærlevåg Burger og Bitcoin',
    arbeidsgiverOrgnr: null,
    arbeidskategori: null,
    arbeidsgiverKontonr: '87865275970',
    inntektsperiode: 'Månedssats',
    inntektForPerioden: 39691,
    refusjonTom: '2018-03-12',
    refusjonstype: 'Ikke refusjon',
    sykepengerFom: '2018-02-18'
};

const statiskUtbetalingPaaVentMock = {
    vedtak: { fra: '2017-10-13', til: '2018-10-10' },
    utbetalingsgrad: 62,
    oppgjorstype: 'Spesidaler i pung',
    arbeidskategori: 'Omreisende skald',
    stansaarsak: 'Pga mistenkelig oppførsel',
    ferie1: { fra: '2017-07-04', til: '2018-10-29' },
    ferie2: { fra: '2017-07-13', til: '2019-02-03' },
    sanksjon: { fra: '2018-04-24', til: '2018-10-31' },
    sykmeldt: { fra: '2017-11-20', til: '2018-06-24' }
};

const sykmelding = {
    sykmelder: 'Lommelegen AS',
    behandlet: '2018-04-01',
    sykmeldt: {
        fra: '2014-02-09T19:24:27.357Z',
        til: '2014-05-11T02:18:25.709Z'
    },
    sykmeldingsgrad: 97,
    gjelderYrkesskade: null,
    gradAvSykmeldingListe: [
        {
            gradert: {
                fra: '2014-07-28T10:47:27.559Z',
                til: '2014-01-03T06:49:39.367Z'
            },
            sykmeldingsgrad: 89
        }
    ]
};

export const statiskSykepengerMock: Sykepenger = {
    fodselsnummer: '10108000398',
    sykmeldtFom: '2019-02-06',
    forbrukteDager: 23,
    ferie1: { fra: '2014-01-19T06:56:39.720Z', til: '2014-01-14T00:16:11.870Z' },
    ferie2: null,
    sanksjon: {
        fra: '2014-01-19T01:31:21.521Z',
        til: '2014-09-05T11:21:25.288Z'
    },
    stansaarsak: null,
    unntakAktivitet: null,
    forsikring: {
        forsikringsordning: 'Betaler beskyttelsespenger til Mafia',
        premiegrunnlag: 837,
        erGyldig: false,
        forsikret: null
    },
    sykmeldinger: [sykmelding, sykmelding],
    kommendeUtbetalinger: [statiskKommendeUtbetaling, statiskKommendeUtbetaling],
    utbetalingerPaaVent: [statiskUtbetalingPaaVentMock, statiskUtbetalingPaaVentMock],
    bruker: '10108000398',
    midlertidigStanset: null,
    slutt: '2019-01-16',
    arbeidsforholdListe: [arbeidsforhold, arbeidsforhold],
    erArbeidsgiverperiode: true,
    arbeidskategori: 'Ærlig arbeid'
};
