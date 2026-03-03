import type { PeriodeDagpengerDtoKilde, PeriodeDagpengerDtoYtelseType } from 'src/generated/modiapersonoversikt-api';

export const statiskPeriodeDagpengerDtoMock = {
    fraOgMedDato: '2025-06-07',
    ytelseType: 'DAGPENGER_ARBEIDSSOKER_MOCKET' as PeriodeDagpengerDtoYtelseType,
    tilOgMedDato: '2025-06-20',
    kilde: 'STATISK_MOCKEKILDE' as PeriodeDagpengerDtoKilde
};
