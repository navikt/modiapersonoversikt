import type { BeregnetDagDagpengerDtoKilde } from 'src/generated/modiapersonoversikt-api';

export const statiskPeriodeDagpengerDtoMock = {
    eldsteFraOgMedDato: '2025-06-06',
    perioder: [
        {
            fraOgMed: '2025-06-06',
            tilOgMed: '2025-06-19',
            kilde: 'ARENA' as BeregnetDagDagpengerDtoKilde,
            sats: 100,
            gjenståendeDager: 3,
            utbetaltBeløp: 5000
        },
        {
            fraOgMed: '2025-08-08',
            tilOgMed: '2025-08-21',
            kilde: 'ARENA' as BeregnetDagDagpengerDtoKilde,
            sats: 100,
            gjenståendeDager: 10,
            utbetaltBeløp: 50000
        },
        {
            fraOgMed: '2025-10-10',
            tilOgMed: '2025-10-23',
            kilde: 'DP_SAK' as BeregnetDagDagpengerDtoKilde,
            sats: 100,
            gjenståendeDager: 12,
            utbetaltBeløp: 3000
        }
    ]
};
