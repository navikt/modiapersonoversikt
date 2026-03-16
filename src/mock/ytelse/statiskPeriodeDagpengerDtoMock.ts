import type { PeriodeDagpengerDtoKilde, PeriodeDagpengerDtoYtelseType } from 'src/generated/modiapersonoversikt-api';

//export const statiskPeriodeDagpengerDtoMock: PseudoDagpengerVedtak = {
export const statiskPeriodeDagpengerDtoMock = {
    nyesteFraOgMedDato: '2025-10-10',
    perioder: [
        {
            fraOgMedDato: '2025-06-06',
            ytelseType: 'DAGPENGER_ARBEIDSSOKER_MOCKET' as PeriodeDagpengerDtoYtelseType,
            tilOgMedDato: '2025-06-19',
            kilde: 'STATISK_MOCKEKILDE' as PeriodeDagpengerDtoKilde
        },
        {
            fraOgMedDato: '2025-08-08',
            ytelseType: 'DAGPENGER_ARBEIDSSOKER_MOCKET' as PeriodeDagpengerDtoYtelseType,
            tilOgMedDato: '2025-08-21',
            kilde: 'STATISK_MOCKEKILDE' as PeriodeDagpengerDtoKilde
        },
        {
            fraOgMedDato: '2025-10-10',
            ytelseType: 'DAGPENGER_ARBEIDSSOKER_MOCKET' as PeriodeDagpengerDtoYtelseType,
            tilOgMedDato: '2025-10-23',
            kilde: 'STATISK_MOCKEKILDE' as PeriodeDagpengerDtoKilde
        }
    ]
};
