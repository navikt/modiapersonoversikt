import { Utbetaling } from '../../../../models/utbetalinger';
import { getMockUtbetaling } from '../../../../mock/utbetalinger-mock';
import { månedOgÅrForUtbetaling, sortByPosteringsDato } from './utbetalingerUtils';

const randomUtbetaling = getMockUtbetaling();

test('lager riktig måned og år string for utbetaling', () => {
    const utbetaling: Utbetaling = {
        ...randomUtbetaling,
        posteringsdato: '1986-12-28'
    };

    const result = månedOgÅrForUtbetaling(utbetaling);

    expect(result).toEqual('Desember 1986');
});

test('sorterer utbetalinger etter dato', () => {
    const utbetalingerFør: Utbetaling[] = [
        {
            ...randomUtbetaling,
            posteringsdato: '1900-12-28'
        }, {
            ...randomUtbetaling,
            posteringsdato: '1986-12-28'
        }, {
            ...randomUtbetaling,
            posteringsdato: '1950-12-28'
        }
    ];

    const utbetalingerEtter: Utbetaling[] = [
        {
            ...randomUtbetaling,
            posteringsdato: '1986-12-28'
        }, {
            ...randomUtbetaling,
            posteringsdato: '1950-12-28'
        }, {
            ...randomUtbetaling,
            posteringsdato: '1900-12-28'
        }
    ];

    const sorterteUtbetalinger = utbetalingerFør.sort(sortByPosteringsDato);

    expect(utbetalingerEtter).toEqual(sorterteUtbetalinger);
});
