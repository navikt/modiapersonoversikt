import { HistoriskUtbetaling } from '../../../../../models/ytelse/ytelse-utbetalinger';
import { getHistoriskUtbetaling } from '../../../../../mock/ytelse/ytelse-utbetalinger-mock';
import faker from 'faker/locale/nb_NO';
import {
    getFormatertKreditortrekkFraHistoriskUtbetaling,
    mapUtbetlaingerTilHistoriskeUtbetalinger
} from './utbetalingerUtils';
import { statiskMockUtbetaling, statiskMockYtelse } from '../../../../../mock/statiskMockUtbetaling';

test('Beregner riktig kreditortrekk fra historisk utbetaling', () => {
    faker.seed(1234);
    const historiskUtbetaling: HistoriskUtbetaling = {
        ...getHistoriskUtbetaling(faker),
        trekk: [
            {
                kreditorsNavn: 'KnusOgKneskålAS',
                beløp: 50
            },
            {
                kreditorsNavn: 'iKreditt.no',
                beløp: 100
            }
        ]
    };

    const result = getFormatertKreditortrekkFraHistoriskUtbetaling(historiskUtbetaling);

    expect(result).toBe('150.00 NOK');
});

describe('Tomt kreditortrekk gir tom streng', () => {
    test('ved tomt array', () => {
        faker.seed(1234);
        const historiskUtbetaling: HistoriskUtbetaling = {
            ...getHistoriskUtbetaling(faker),
            trekk: []
        };

        const result = getFormatertKreditortrekkFraHistoriskUtbetaling(historiskUtbetaling);

        expect(result).toBe('');
    });
    test('ved null', () => {
        faker.seed(1234);
        const historiskUtbetaling: HistoriskUtbetaling = {
            ...getHistoriskUtbetaling(faker),
            trekk: null
        };

        const result = getFormatertKreditortrekkFraHistoriskUtbetaling(historiskUtbetaling);

        expect(result).toBe('');
    });
});

test('Mapper utbetaling til historiske utbetalinger', () => {
    const result = mapUtbetlaingerTilHistoriskeUtbetalinger([
        {
            ...statiskMockUtbetaling,
            ytelser: [statiskMockYtelse, statiskMockYtelse]
        }
    ]);

    expect(result).toHaveLength(2);
});
