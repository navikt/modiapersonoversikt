import type { Foreldrepenger, PseudoDagpengerVedtak, SykepengerSpokelse } from 'src/generated/modiapersonoversikt-api';
import {
    type Arbeidsavklaringspenger,
    getArbeidsavklaringspengerIdDato,
    getUnikArbeidsavklaringspengerKey
} from 'src/models/ytelse/arbeidsavklaringspenger';
import { getDagpengerIdDato, getUnikDagpengerKey } from 'src/models/ytelse/dagpenger';
import { getForeldrepengerIdDato, getUnikForeldrepengerKey } from 'src/models/ytelse/foreldrepenger';
import { getPensjonIdDato, getUnikPensjonKey, type Pensjon } from 'src/models/ytelse/pensjon';
import { getSykepengerSpokelseIdDato, getUnikSykepengerSpokelseKey } from 'src/models/ytelse/sykepenger-spokelse';
import { loggError } from 'src/utils/logger/frontendLogger';
import { getSykepengerIdDato, getUnikSykepengerKey, type Sykepenger } from './sykepenger';
import { getTiltakspengerIdDato, getUnikTiltakspengerKey, type Tiltakspenger } from './tiltakspenger';

export enum YtelseVedtakYtelseType {
    Sykepenger = 'Sykepenger (Infotrygd)',
    Tiltakspenge = 'Tiltakspenger',
    Pensjon = 'Pensjon',
    Arbeidsavklaringspenger = 'Arbeidsavklaringspenger',
    Foreldrepenger = 'Foreldrepenger',
    Dagpenger = 'Dagpenger',
    SykepengerSpokelse = 'Sykepenger (Speil)'
}

export type Ytelse =
    | Sykepenger
    | Tiltakspenger
    | Pensjon
    | Arbeidsavklaringspenger
    | Foreldrepenger
    | PseudoDagpengerVedtak
    | SykepengerSpokelse;

export function isSykepengerSpokelse(ytelse: Ytelse): ytelse is SykepengerSpokelse {
    return 'utbetaltePerioder' in ytelse;
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
export function isArbeidsavklaringspenger(ytelse: Ytelse): ytelse is Arbeidsavklaringspenger {
    return 'rettighetsType' in ytelse;
}
export function isForeldrePenger(ytelse: Ytelse): ytelse is Foreldrepenger {
    return 'ytelse' in ytelse;
}
// only used here, not imported in old modia
function isDagpenger(ytelse: Ytelse): ytelse is PseudoDagpengerVedtak {
    return 'ytelseType' in ytelse; // this one is unique... right now
}

export function getYtelseIdDato(ytelse: Ytelse) {
    if (isSykepengerSpokelse(ytelse)) {
        return getSykepengerSpokelseIdDato(ytelse);
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
    if (isArbeidsavklaringspenger(ytelse)) {
        return getArbeidsavklaringspengerIdDato(ytelse);
    }
    if (isForeldrePenger(ytelse)) {
        return getForeldrepengerIdDato(ytelse);
    }
    if (isDagpenger(ytelse)) {
        return getDagpengerIdDato(ytelse);
    }
    loggError(new Error('Matchet ingen ytelser / kunne ikke finne id-dato'));
    return 'ukjent dato';
}

export function getUnikYtelseKey(ytelse: Ytelse) {
    if (isSykepengerSpokelse(ytelse)) {
        return getUnikSykepengerSpokelseKey(ytelse);
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
    if (isArbeidsavklaringspenger(ytelse)) {
        return getUnikArbeidsavklaringspengerKey(ytelse);
    }
    if (isForeldrePenger(ytelse)) {
        return getUnikForeldrepengerKey(ytelse);
    }
    if (isDagpenger(ytelse)) {
        return getUnikDagpengerKey(ytelse);
    }
    loggError(new Error('Matchet ingen ytelser / kunne ikke finne ytelse-key'));
    return 'ukjent ytelse';
}
