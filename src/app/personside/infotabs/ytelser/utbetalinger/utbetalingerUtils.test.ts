import { HistoriskUtbetaling } from '../../../../../models/ytelse/ytelse-utbetalinger';
import { getHistoriskUtbetaling } from '../../../../../mock/ytelse/ytelse-utbetalinger-mock';
import faker from 'faker/locale/nb_NO';
import { getFormatertKreditortrekkFraHistoriskUtbetaling } from './utbetalingerUtils';

test('Beregner riktig kreditortrekk fra historisk utbetaling', () => {
    faker.seed(1234);
    const historiskUtbetaling: HistoriskUtbetaling = {
        ...getHistoriskUtbetaling(faker),
        trekk: [
            {
                kreditorsNavn: 'KnusOgKneskålAS',
                beløp: 50,
            },
            {
                kreditorsNavn: 'iKreditt.no',
                beløp: 100,
            },
        ],
    };

    const result = getFormatertKreditortrekkFraHistoriskUtbetaling(historiskUtbetaling);

    expect(result).toContain('150.00 NOK');
});
