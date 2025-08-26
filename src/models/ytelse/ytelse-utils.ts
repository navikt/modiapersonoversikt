import { type Pensjon, getPensjonIdDato, getUnikPensjonKey } from 'src/models/ytelse/pensjon';
import { loggError } from '../../utils/logger/frontendLogger';
import { type Foreldrepengerettighet, getForeldepengerIdDato, getUnikForeldrepengerKey } from './foreldrepenger';
import { type Pleiepengerettighet, getPleiepengerIdDato, getUnikPleiepengerKey } from './pleiepenger';
import { type Sykepenger, getSykepengerIdDato, getUnikSykepengerKey } from './sykepenger';
import { type Tiltakspenger, getTiltakspengerIdDato, getUnikTiltakspengerKey } from './tiltakspenger';

export type Ytelse = Pleiepengerettighet | Foreldrepengerettighet | Sykepenger | Tiltakspenger | Pensjon;

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
    return 'rettighet' in ytelse;
}
export function isPensjon(ytelse: Ytelse): ytelse is Pensjon {
    return 'fomDato' in ytelse;
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
    if (isPensjon(ytelse)) {
        return getPensjonIdDato(ytelse);
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
    if (isPensjon(ytelse)) {
        return getUnikPensjonKey(ytelse);
    }
    loggError(new Error('Matchet ingen ytelser / kunne ikke finne ytelse-key'));
    return 'ukjent ytelse';
}
