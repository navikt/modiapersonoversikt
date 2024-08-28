import { getPleiepengerIdDato, getUnikPleiepengerKey, Pleiepengerettighet } from './pleiepenger';
import { Foreldrepengerettighet, getForeldepengerIdDato, getUnikForeldrepengerKey } from './foreldrepenger';
import { getSykepengerIdDato, getUnikSykepengerKey, Sykepenger } from './sykepenger';
import { loggError } from '../../utils/logger/frontendLogger';
import { getTiltakspengerIdDato, getUnikTiltakspengerKey, Tiltakspenger } from './tiltakspenger';

export type Ytelse = Pleiepengerettighet | Foreldrepengerettighet | Sykepenger | Tiltakspenger;

export function isPleiepenger(ytelse: Ytelse): ytelse is Pleiepengerettighet {
    return 'pleiepengedager' in ytelse;
}

export function isForeldrepenger(ytelse: Ytelse): ytelse is Foreldrepengerettighet {
    return 'forelder' in ytelse;
}

export function isSykepenger(ytelse: Ytelse): ytelse is Sykepenger {
    return 'sykmeldtFom' in ytelse;
}
export function isTiltakspenger(ytelse: Ytelse): ytelse is Tiltakspenger {
    return 'rettighet' in ytelse && ytelse.rettighet === 'TILTAKSPENGER';
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
    if (isTiltakspenger(ytelse)) {
        return getTiltakspengerIdDato(ytelse);
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
    if (isTiltakspenger(ytelse)) {
        return getUnikTiltakspengerKey(ytelse);
    }
    loggError(new Error('Matchet ingen ytelser / kunne ikke finne ytelse-key'));
    return 'ukjent ytelse';
}
