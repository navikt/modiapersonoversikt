import faker from 'faker/locale/nb_NO';
import { getSummertKreditortrekkFraUtbetaling } from './historiskeUtbetalingerUtils';
import { statiskMockYtelse } from '../../../../../../mock/statiskMockUtbetaling';
import { Ytelse } from '../../../../../../models/utbetalinger';

test('Beregner riktig kreditortrekk fra ytelse', () => {
    faker.seed(1234);
    const historiskUtbetaling: Ytelse = {
        ...statiskMockYtelse,
        trekkListe: [
            {
                kreditor: 'KnusOgKneskålAS',
                trekkbeløp: 50,
                trekktype: ''
            },
            {
                kreditor: 'iKreditt.no',
                trekkbeløp: 100,
                trekktype: ''
            }
        ]
    };

    const result = getSummertKreditortrekkFraUtbetaling(historiskUtbetaling);

    expect(result).toEqual(150);
});
