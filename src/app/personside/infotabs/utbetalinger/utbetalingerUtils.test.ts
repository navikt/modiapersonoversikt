import { Utbetaling } from '../../../../models/utbetalinger';
import { getMockUtbetaling, getMockYtelse } from '../../../../mock/utbetalinger-mock';
import {
    getOverskriftFromUtbetaling,
    getPeriodeFromUtbetalig,
    getNettoSumUtbetaling,
    månedOgÅrForUtbetaling,
    sortByPosteringsDato
}
    from './utbetalingerUtils';
import { Periode } from '../../../../models/periode';

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

    const sorterteUtbetalinger = utbetalingerFør.sort(sortByPosteringsDato);

    expect(utbetalingerEtter).toEqual(sorterteUtbetalinger);
});

test('finner riktig periode for utbetaling', () => {
    const utbetaling: Utbetaling = {
        ...randomUtbetaling,
        ytelser: [
            {
                ...randomYtelse,
                periode: {
                    start: '2018-01-01',
                    slutt: '2018-02-01'
                }
            }, {
                ...randomYtelse,
                periode: {
                    start: '2017-01-01',
                    slutt: '2017-02-01'
                }
            }
        ]
    };

    const periode: Periode = getPeriodeFromUtbetalig(utbetaling);

    expect(periode.fra).toEqual('2017-01-01');
    expect(periode.til).toEqual('2018-02-01');
});

test('finn riktig overskrift for utbetaling med en enkelt ytelse', () => {
    const utbetaling: Utbetaling = {
        ...randomUtbetaling,
        ytelser: [{
            ...randomYtelse,
            type: 'Dette er tittelen'
        }]
    };

    const tittel = getOverskriftFromUtbetaling(utbetaling);

    expect(tittel).toEqual('Dette er tittelen');
});

test('finn riktig overskrift for utbetaling flere ytelser', () => {
    const utbetaling: Utbetaling = {
        ...randomUtbetaling,
        ytelser: [{
            ...randomYtelse,
            type: 'Dette er tittelen'
        }, {
            ...randomYtelse,
            type: 'Dette er den andre tittelen'
        }]
    };

    const tittel = getOverskriftFromUtbetaling(utbetaling);

    expect(tittel).toEqual('Diverse ytelser');
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
