import { Utbetaling, Ytelse } from '../../../../models/utbetalinger';
import { getMockUtbetaling, getMockYtelse } from '../../../../mock/utbetalinger-mock';
import {
    getBruttoSumYtelser, getFraDateFromFilter,
    getGjeldendeDatoForUtbetaling,
    getNettoSumYtelser, getTilDateFromFilter, getTrekkSumYtelser,
    månedOgÅrForUtbetaling, periodeStringFromYtelse, summertBeløpStringFraUtbetalinger,
    utbetalingDatoComparator
}
    from './utbetalingerUtils';
import { FilterState, PeriodeValg } from './Filter';
import moment = require('moment');

const randomUtbetaling = getMockUtbetaling();
const randomUtbetalingUtenDato: Utbetaling = {
        ...randomUtbetaling,
        forfallsdato: null,
        utbetalingsdato: null
};
const randomYtelse = getMockYtelse();

test('lager riktig måned og år string for utbetaling', () => {
    const utbetaling: Utbetaling = {
        ...randomUtbetaling,
        utbetalingsdato: '1986-12-28'
    };

    const result = månedOgÅrForUtbetaling(utbetaling);

    expect(result).toEqual('Desember 1986');
});

test('returnerer tellende dato for utbetaling', () => {
    const utbetalingMedPosteringsdato: Utbetaling = {
        ...randomUtbetalingUtenDato,
        posteringsdato: '1900-01-01'
    };

    const utbetalingMedForfallsDato: Utbetaling = {
        ...utbetalingMedPosteringsdato,
        forfallsdato: '1950-01-01'
    };

    const utbetalingMedUtbetalingsDato: Utbetaling = {
        ...utbetalingMedForfallsDato,
        utbetalingsdato: '2000-01-01'
    };

    expect(getGjeldendeDatoForUtbetaling(utbetalingMedPosteringsdato)).toEqual('1900-01-01');
    expect(getGjeldendeDatoForUtbetaling(utbetalingMedForfallsDato)).toEqual('1950-01-01');
    expect(getGjeldendeDatoForUtbetaling(utbetalingMedUtbetalingsDato)).toEqual('2000-01-01');
});

test('lager riktig periodestreng for ytelse', () => {
    const ytelse: Ytelse = {
        ...randomYtelse,
        periode: {
            start: '2010-01-01',
            slutt: '2015-01-01'
        }
    };

    const periodestreng = periodeStringFromYtelse(ytelse);

    expect(periodestreng).toEqual('01.01.2010 - 01.01.2015');
});

test('sorterer utbetalinger etter dato', () => {
    const utbetalingerFør: Utbetaling[] = [
        {
            ...randomUtbetalingUtenDato,
            posteringsdato: '1900-12-28',
        }, {
            ...randomUtbetalingUtenDato,
            posteringsdato: '1930-12-28',
            utbetalingsdato: '1986-12-28',
        }, {
            ...randomUtbetalingUtenDato,
            posteringsdato: '1800-12-28',
            forfallsdato: '1950-12-28',
        }
    ];

    const utbetalingerEtter: Utbetaling[] = [
        {
            ...randomUtbetalingUtenDato,
            posteringsdato: '1930-12-28',
            utbetalingsdato: '1986-12-28'
        }, {
            ...randomUtbetalingUtenDato,
            posteringsdato: '1800-12-28',
            forfallsdato: '1950-12-28'
        }, {
            ...randomUtbetalingUtenDato,
            posteringsdato: '1900-12-28'
        }
    ];

    const sorterteUtbetalinger = utbetalingerFør.sort(utbetalingDatoComparator);

    expect(utbetalingerEtter).toEqual(sorterteUtbetalinger);
});

test('summerer netto utbetaling riktig', () => {
   const ytelser: Ytelse[] = [{
           ...randomYtelse,
           nettobeløp: 100
       }, {
           ...randomYtelse,
           nettobeløp: 200
       }];

   const sumForYtelser = getNettoSumYtelser(ytelser);

   expect(sumForYtelser).toEqual(300);
});

test('summerer brutto utbetaling riktig', () => {
   const ytelser: Ytelse[] = [{
           ...randomYtelse,
           ytelseskomponentersum: 100
       }, {
           ...randomYtelse,
           ytelseskomponentersum: 500
       }];

   const sumForYtelser = getBruttoSumYtelser(ytelser);

   expect(sumForYtelser).toEqual(600);
});

test('summerer trekk riktig', () => {
   const ytelser: Ytelse[] = [{
           ...randomYtelse,
           skattsum: -100,
           trekksum: 0
       }, {
           ...randomYtelse,
           skattsum: -200,
           trekksum: -100
       }];

   const trekkForYtelser = getTrekkSumYtelser(ytelser);

   expect(trekkForYtelser).toEqual(-400);
});

test('summerer beløp på tvers av utbetalinger', () => {
    const randomTellendeUtbetaling = {
        ...randomUtbetaling,
        status: 'ok',
        utbetalingsdato: '2010-01-01'
    };

    const utbetalinger: Utbetaling [] = [{
        ...randomTellendeUtbetaling,
        ytelser: [{
            ...randomYtelse,
            nettobeløp: 200
        }, {
            ...randomYtelse,
            nettobeløp: 200
        }]
    }, {
        ...randomTellendeUtbetaling,
        ytelser: [{
            ...randomYtelse,
            nettobeløp: 200
        }]
    }, {
        ...randomUtbetaling,
        status: 'Returnert til NAV',
        ytelser: [{
            ...randomYtelse,
            nettobeløp: 10000
        }]
    }, {
        ...randomUtbetaling,
        utbetalingsdato: null,
        ytelser: [{
            ...randomYtelse,
            nettobeløp: 10000
        }]
    }];

    const summert = summertBeløpStringFraUtbetalinger(utbetalinger, getNettoSumYtelser);

    expect(parseInt(summert, 10)).toEqual(600);
});

const mockFilter: FilterState = {
    periode: {
        radioValg: PeriodeValg.SISTE_30_DAGER,
        egendefinertPeriode: {
            fra: new Date(),
            til: new Date()
        }
    },
    ytelser: [],
    utbetaltTil: []
};

test('henter riktig fra og til-date fra filter ved valg av "siste 30 dager"', () => {
    const filter: FilterState = {
        ...mockFilter,
        periode: {
            ...mockFilter.periode,
            radioValg: PeriodeValg.SISTE_30_DAGER
        }
    };

    const fraDate: Date = getFraDateFromFilter(filter);
    const tilDate: Date = getTilDateFromFilter(filter);

    expect(moment(fraDate).toString()).toEqual(moment().subtract(30, 'day').startOf('day').toString());
    expect(moment(tilDate).toString()).toEqual(moment().add(90, 'day').endOf('day').toString());
});

test('henter riktig fra og til-date fra filter ved valg av "inneværende år', () => {
    const filter: FilterState = {
        ...mockFilter,
        periode: {
            ...mockFilter.periode,
            radioValg: PeriodeValg.INNEVÆRENDE_ÅR
        }
    };

    const fraDate: Date = getFraDateFromFilter(filter);
    const tilDate: Date = getTilDateFromFilter(filter);

    expect(moment(fraDate).toString()).toEqual(moment().startOf('year').toString());
    expect(moment(tilDate).toString()).toEqual(moment().add(90, 'day').endOf('day').toString());
});

test('henter riktig fra og til-date fra filter ved valg av "i fjor', () => {
    const filter: FilterState = {
        ...mockFilter,
        periode: {
            ...mockFilter.periode,
            radioValg: PeriodeValg.I_FJOR
        }
    };

    const fraDate: Date = getFraDateFromFilter(filter);
    const tilDate: Date = getTilDateFromFilter(filter);

    expect(moment(fraDate).toString()).toEqual(moment().subtract(1, 'year').startOf('year').toString());
    expect(moment(tilDate).toString()).toEqual(moment().subtract(1, 'year').endOf('year').toString());
});

test('henter riktig fra og til-date fra filter ved valg av "egendefinert periode', () => {
    const filter: FilterState = {
        ...mockFilter,
        periode: {
            egendefinertPeriode: {
                fra: new Date(0),
                til: new Date(0)
            },
            radioValg: PeriodeValg.EGENDEFINERT
        }
    };

    const fraDate: Date = getFraDateFromFilter(filter);
    const tilDate: Date = getTilDateFromFilter(filter);

    expect(moment(fraDate).toString()).toEqual(moment(0).toString());
    expect(moment(tilDate).toString()).toEqual(moment(0).toString());
});
