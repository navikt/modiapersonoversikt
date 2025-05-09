import { statiskMockUtbetaling, statiskMockYtelse } from '../../../../mock/utbetalinger/statiskMockUtbetaling';
import type { Utbetaling } from '../../../../models/utbetalinger';
import { PeriodeValg, type UtbetalingFilterState } from '../../../../redux/utbetalinger/types';
import { getFiltrerteUtbetalinger } from './Utbetalinger';

const filterState: UtbetalingFilterState = {
    periode: {
        radioValg: PeriodeValg.SISTE_30_DAGER,
        egendefinertPeriode: {
            fra: new Date(0).toISOString(),
            til: new Date(0).toISOString()
        }
    },
    utbetaltTil: ['Bruker'],
    ytelser: { Sykepenger: true }
};

test('filtrerer bort ytelser i utbetalinger som ikke er valgt i filter', () => {
    const filter: UtbetalingFilterState = {
        ...filterState,
        ytelser: { Dagpenger: true }
    };

    const utbetalinger: Utbetaling[] = [
        {
            ...statiskMockUtbetaling,
            erUtbetaltTilPerson: true,
            ytelser: [
                {
                    ...statiskMockYtelse,
                    type: 'Dagpenger'
                },
                {
                    ...statiskMockYtelse,
                    type: 'Sykepenger'
                }
            ]
        }
    ];

    const filtrerteUtbetalinger = getFiltrerteUtbetalinger(utbetalinger, filter);
    const forventetResultat: Utbetaling[] = [
        {
            ...statiskMockUtbetaling,
            erUtbetaltTilPerson: true,
            ytelser: [
                {
                    ...statiskMockYtelse,
                    type: 'Dagpenger'
                }
            ]
        }
    ];

    expect(filtrerteUtbetalinger).toEqual(forventetResultat);
});

test('filtrerer bort utbetalinger som ikke er utbetalt til valgt mottaker i filter', () => {
    const filter: UtbetalingFilterState = {
        ...filterState,
        ytelser: { Dagpenger: true },
        utbetaltTil: ['Berit AS']
    };

    const utbetalinger: Utbetaling[] = [
        {
            ...statiskMockUtbetaling,
            erUtbetaltTilPerson: true,
            ytelser: [
                {
                    ...statiskMockYtelse,
                    type: 'Dagpenger'
                }
            ]
        },
        {
            ...statiskMockUtbetaling,
            erUtbetaltTilPerson: false,
            erUtbetaltTilOrganisasjon: true,
            utbetaltTil: 'Berit AS',
            ytelser: [
                {
                    ...statiskMockYtelse,
                    type: 'Dagpenger'
                }
            ]
        }
    ];

    const filtrerteUtbetalinger = getFiltrerteUtbetalinger(utbetalinger, filter);
    const forventetResultat: Utbetaling[] = [
        {
            ...statiskMockUtbetaling,
            erUtbetaltTilPerson: false,
            erUtbetaltTilOrganisasjon: true,
            utbetaltTil: 'Berit AS',
            ytelser: [
                {
                    ...statiskMockYtelse,
                    type: 'Dagpenger'
                }
            ]
        }
    ];

    expect(filtrerteUtbetalinger).toEqual(forventetResultat);
});
