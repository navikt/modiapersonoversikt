import { Utbetaling, Ytelse } from '../models/utbetalinger';

export const statiskMockYtelse: Ytelse = {
    type: 'Sykepenger',
    ytelseskomponentListe: [
        {
            ytelseskomponenttype: 'Mouse',
            satsbeløp: 1930,
            satstype: 'Satstype',
            satsantall: 2,
            ytelseskomponentbeløp: 3860
        },
        {
            ytelseskomponenttype: 'Computer',
            satsbeløp: 1310,
            satstype: 'Satstype',
            satsantall: 3,
            ytelseskomponentbeløp: 3930
        },
        {
            ytelseskomponenttype: 'Bacon',
            satsbeløp: 558,
            satstype: 'Satstype',
            satsantall: 10,
            ytelseskomponentbeløp: 5580
        }
    ],
    ytelseskomponentersum: 13370,
    trekkListe: [
        {
            trekktype: 'Prosenttrekk',
            trekkbeløp: -1042,
            kreditor: 'Bjerke, Berntsen and Nilsen'
        },
        {
            trekktype: 'Prosenttrekk',
            trekkbeløp: -212,
            kreditor: 'Olsen AS'
        }
    ],
    trekksum: -1254,
    skattListe: [
        {
            skattebeløp: -730
        }
    ],
    skattsum: -730,
    nettobeløp: 11386,
    periode: {
        start: '2016-11-09',
        slutt: '2017-10-31'
    },
    bilagsnummer: '1107807621'
};

export const statiskMockUtbetaling: Utbetaling = {
    utbetaltTil: 'AREMARK TESTFAMILIEN',
    erUtbetaltTilPerson: true,
    erUtbetaltTilOrganisasjon: false,
    erUtbetaltTilSamhandler: false,
    nettobeløp: 11386,
    posteringsdato: '2017-03-26',
    utbetalingsdato: '2017-03-29',
    forfallsdato: null,
    melding: 'Utbetalingsmelding',
    metode: 'Bankkontooverføring',
    status: 'Utbetalt',
    konto: '83980854563',
    ytelser: [statiskMockYtelse]
};
