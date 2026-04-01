import type { SykepengerSpokelse } from 'src/generated/modiapersonoversikt-api';

export const statiskSykepengerSpokelseMock: SykepengerSpokelse = {
    utbetaltePerioder: [
        {
            fom: '2025-07-01',
            tom: '2025-09-31',
            grad: 50,
            tags: []
        },
        {
            fom: '2025-04-01',
            tom: '2024-06-31',
            grad: 100,
            tags: []
        }
    ]
};
