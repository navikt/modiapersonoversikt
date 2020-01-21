import { getPleiepengerIdDato, getUnikPleiepengerKey, Pleiepengerettighet } from './pleiepenger';
import { Foreldrepengerettighet, getForeldepengerIdDato, getUnikForeldrepengerKey } from './foreldrepenger';
import { getSykepengerIdDato, getUnikSykepengerKey, Sykepenger } from './sykepenger';
import { loggError } from '../../utils/frontendLogger';

export type Ytelse = Pleiepengerettighet | Foreldrepengerettighet | Sykepenger;

export function isPleiepenger(ytelse: Ytelse): ytelse is Pleiepengerettighet {
    return ytelse.hasOwnProperty('pleiepengedager');
}

export function isForeldrepenger(ytelse: Ytelse): ytelse is Foreldrepengerettighet {
    return ytelse.hasOwnProperty('forelder');
}

export function isSykepenger(ytelse: Ytelse): ytelse is Sykepenger {
    return ytelse.hasOwnProperty('sykmeldtFom');
}

export function getYtelseIdDato(ytelse: Ytelse) {
    if (isPleiepenger(ytelse)) {
        return getPleiepengerIdDato(ytelse);
    }
    if (isForeldrepenger(ytelse)) {
        return getForeldepengerIdDato(ytelse);
    }
    if (isSykepenger(ytelse)) {
        return getSykepengerIdDato(ytelse);
    }
    loggError(new Error('Matchet ingen ytelser / kunne ikke finne id-dato'));
    return 'ukjent dato';
}

export function getUnikYtelseKey(ytelse: Ytelse) {
    if (isPleiepenger(ytelse)) {
        return getUnikPleiepengerKey(ytelse);
    }
    if (isForeldrepenger(ytelse)) {
        return getUnikForeldrepengerKey(ytelse);
    }
    if (isSykepenger(ytelse)) {
        return getUnikSykepengerKey(ytelse);
    }
    loggError(new Error('Matchet ingen ytelser / kunne ikke finne ytelse-key'));
    return 'ukjent ytelse';
}
