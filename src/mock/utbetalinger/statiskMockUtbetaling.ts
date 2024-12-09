import type { Utbetaling, Ytelse } from '../../models/utbetalinger';

export const statiskMockYtelse: Ytelse = {
    type: 'Sykepenger',
    ytelseskomponentListe: [
        {
            ytelseskomponenttype: 'Mouse',
            satsbelop: 1930,
            satstype: 'Satstype',
            satsantall: 2,
            ytelseskomponentbelop: 3860
        },
        {
            ytelseskomponenttype: 'Computer',
            satsbelop: 1310,
            satstype: 'Satstype',
            satsantall: 3,
            ytelseskomponentbelop: 3930
        },
        {
            ytelseskomponenttype: 'Bacon',
            satsbelop: 558,
            satstype: 'Satstype',
            satsantall: 10,
            ytelseskomponentbelop: 5580
        }
    ],
    ytelseskomponentersum: 13370,
    trekkListe: [
        {
            trekktype: 'Prosenttrekk',
            trekkbelop: -1042,
            kreditor: 'Bjerke, Berntsen and Nilsen'
        },
        {
            trekktype: 'Prosenttrekk',
            trekkbelop: -212,
            kreditor: 'Olsen AS'
        }
    ],
    trekksum: -1254,
    skattListe: [
        {
            skattebelop: -730
        }
    ],
    skattsum: -730,
    nettobelop: 11386,
    periode: {
        start: '2016-11-09',
        slutt: '2017-10-31'
    },
    bilagsnummer: '1107807621',
    arbeidsgiver: {
        navn: 'Ensjø Bistro',
        orgnr: '1234556678235'
    }
};

export const statiskMockUtbetaling: Utbetaling = {
    utbetaltTil: 'AREMARK TESTFAMILIEN',
    erUtbetaltTilPerson: true,
    erUtbetaltTilOrganisasjon: false,
    erUtbetaltTilSamhandler: false,
    nettobelop: 11386,
    posteringsdato: '2017-03-26',
    utbetalingsdato: '2017-03-29',
    forfallsdato: null,
    melding: 'Utbetalingsmelding',
    metode: 'Bankkontooverføring',
    status: 'Utbetalt',
    konto: '83980854563',
    ytelser: [statiskMockYtelse]
};
