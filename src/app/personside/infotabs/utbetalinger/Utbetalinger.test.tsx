import { FilterState, PeriodeValg } from './filter/Filter';
import { Utbetaling } from '../../../../models/utbetalinger';
import { statiskMockUtbetaling, statiskMockYtelse } from '../../../../mock/statiskMockUtbetaling';
import { getFiltrerteUtbetalinger } from './Utbetalinger';

const filterState: FilterState = {
    periode: {
        radioValg: PeriodeValg.SISTE_30_DAGER,
        egendefinertPeriode: {
            fra: new Date(0),
            til: new Date(0)
        }
    },
    utbetaltTil: ['Bruker'],
    ytelser: ['Sykepenger']
};

test('filtrerer bort ytelser i utbetalinger som ikke er valgt i filter', () => {
    const filter: FilterState = {
        ...filterState,
        ytelser: ['Dagpenger']
    };

    const utbetalinger: Utbetaling[] = [{
        ...statiskMockUtbetaling,
        erUtbetaltTilPerson: true,
        ytelser: [{
            ...statiskMockYtelse,
            type: 'Dagpenger'
        }, {
            ...statiskMockYtelse,
            type: 'Sykepenger'
        }]
    }];

    const filtrerteUtbetalinger = getFiltrerteUtbetalinger(utbetalinger, filter);
    const forventetResultat: Utbetaling[] = [{
        ...statiskMockUtbetaling,
        erUtbetaltTilPerson: true,
        ytelser: [{
            ...statiskMockYtelse,
            type: 'Dagpenger'
        }]
    }];

    expect(filtrerteUtbetalinger).toEqual(forventetResultat);
});

test('filtrerer bort utbetalinger som ikke er utbetalt til valgt mottaker i filter', () => {
    const filter: FilterState = {
        ...filterState,
        ytelser: ['Dagpenger'],
        utbetaltTil: ['Berit AS']
    };

    const utbetalinger: Utbetaling[] = [{
        ...statiskMockUtbetaling,
        erUtbetaltTilPerson: true,
        ytelser: [{
            ...statiskMockYtelse,
            type: 'Dagpenger'
        }]
    }, {
        ...statiskMockUtbetaling,
        erUtbetaltTilPerson: false,
        erUtbetaltTilOrganisasjon: true,
        utbetaltTil: 'Berit AS',
        ytelser: [{
            ...statiskMockYtelse,
            type: 'Dagpenger'
        }]
    }];

    const filtrerteUtbetalinger = getFiltrerteUtbetalinger(utbetalinger, filter);
    const forventetResultat: Utbetaling[] = [{
        ...statiskMockUtbetaling,
        erUtbetaltTilPerson: false,
        erUtbetaltTilOrganisasjon: true,
        utbetaltTil: 'Berit AS',
        ytelser: [{
            ...statiskMockYtelse,
            type: 'Dagpenger'
        }]
    }];

    expect(filtrerteUtbetalinger).toEqual(forventetResultat);
});
