import dayjs from 'dayjs';
import { type ForeldrepengerFpSak, ForeldrepengerFpSakYtelse } from 'src/generated/modiapersonoversikt-api';
import { backendDatoformat } from 'src/utils/date-utils';

export type ForeldrepengerFpSakPeriode = ForeldrepengerFpSak['perioder'][number];

export function getForeldrepengerFpSakIdDato(ytelse: ForeldrepengerFpSak) {
    return ytelse.fom ?? dayjs().format(backendDatoformat);
}

export function getUnikForeldrepengerFpSakKey(ytelse: ForeldrepengerFpSak) {
    // ø fungerer ikke som deep link i urlen
    const ytelsetype = ytelse.ytelse === ForeldrepengerFpSakYtelse.ENGANGSST_NAD ? 'ENGANGSSTONAD' : ytelse.ytelse;
    return `${ytelsetype.toLowerCase()}-${ytelse.saksnummer}`;
}
