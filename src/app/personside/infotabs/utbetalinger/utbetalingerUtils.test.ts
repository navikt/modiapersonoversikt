import { Utbetaling } from '../../../../models/utbetalinger';
import { getMockUtbetaling, getMockYtelse } from '../../../../mock/utbetalinger-mock';
import {
    getNettoSumUtbetaling,
    månedOgÅrForUtbetaling,
    utbetalingDatoComparator
}
    from './utbetalingerUtils';

const randomUtbetaling = getMockUtbetaling();
const randomYtelse = getMockYtelse();

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

    const sorterteUtbetalinger = utbetalingerFør.sort(utbetalingDatoComparator);

    expect(utbetalingerEtter).toEqual(sorterteUtbetalinger);
});

test('summerer utbetaling riktig', () => {
   const utbetaling: Utbetaling = {
       ...randomUtbetaling,
       ytelser: [{
           ...randomYtelse,
           nettobeløp: 100
       }, {
           ...randomYtelse,
           nettobeløp: 200
       }]
   };

   const sumForYtelser = getNettoSumUtbetaling(utbetaling);

   expect(sumForYtelser).toEqual(300);
});
