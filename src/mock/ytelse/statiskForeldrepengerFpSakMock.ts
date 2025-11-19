import { ForeldrepengerFpSakYtelse } from 'src/generated/modiapersonoversikt-api';

export const statiskForeldrepengerFpSakMock = {
    ytelse: ForeldrepengerFpSakYtelse.FORELDREPENGER,
    fom: '2024-12-01',
    tom: '2025-02-31',
    perioder: [
        {
            fom: '2025-01-01',
            tom: '2025-02-31',
            grad: 100
        },
        {
            fom: '2024-12-01',
            tom: '2024-12-31',
            grad: 100
        }
    ],
    saksnummer: '2023123456'
};

export const statiskSvangerskapspengerFpSakMock = {
    ytelse: ForeldrepengerFpSakYtelse.SVANGERSKAPSPENGER,
    fom: '2022-12-01',
    tom: '2025-02-31',
    perioder: [
        {
            fom: '2025-01-01',
            tom: '2025-02-31',
            grad: 100
        },
        {
            fom: '2022-12-01',
            tom: '2022-12-31',
            grad: 100
        }
    ],
    saksnummer: '2023123445'
};

export const statiskEngangstonadFpSakMock = {
    ytelse: ForeldrepengerFpSakYtelse.ENGANGST_NAD,
    fom: '2025-08-01',
    tom: '2025-08-01',
    perioder: [
        {
            fom: '2025-08-01',
            tom: '2025-08-01',
            grad: 100
        }
    ],
    saksnummer: '2023123412'
};
