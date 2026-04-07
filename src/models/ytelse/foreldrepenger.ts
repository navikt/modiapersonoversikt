import dayjs from 'dayjs';
import { type Foreldrepenger, ForeldrepengerYtelse } from 'src/generated/modiapersonoversikt-api';
import { backendDatoformat } from 'src/utils/date-utils';

export type ForeldrepengerPerioder = Foreldrepenger['perioder'][number];

export function getForeldrepengerIdDato(ytelse: Foreldrepenger) {
    return ytelse.fom ?? dayjs().format(backendDatoformat);
}

export function getUnikForeldrepengerKey(ytelse: Foreldrepenger) {
    // ø fungerer ikke som deep link i urlen
    const ytelsetype = ytelse.ytelse === ForeldrepengerYtelse.ENGANGSST_NAD ? 'ENGANGSSTONAD' : ytelse.ytelse;
    return `${ytelsetype.toLowerCase()}-${ytelse.saksnummer}`;
}
