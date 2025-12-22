import type { Utbetalingsperioder } from 'src/generated/modiapersonoversikt-api';

export const statiskSykepengerSpokelseMock: Utbetalingsperioder = {
    utbetaltePerioder: [
        {
            fom: '2025-07-01',
            tom: '2025-09-31',
            grad: 50
        },
        {
            fom: '2025-04-01',
            tom: '2024-06-31',
            grad: 100
        }
    ]
};
