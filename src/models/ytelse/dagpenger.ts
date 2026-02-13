import type { PeriodeDagpengerDto } from 'src/generated/modiapersonoversikt-api';

/**
 * "Id Dato" = date formatted date string, used as an id
 */
export function getPeriodeDagpengerDtoIdDato(ytelse: PeriodeDagpengerDto) {
    return ytelse.fraOgMedDato;
}

export function getUnikPeriodeDagpengerDtoKey(ytelse: PeriodeDagpengerDto) {
    // TODO ensure this is actually unique
    return `${ytelse.ytelseType.toLowerCase()}-${ytelse.fraOgMedDato}`;
}
