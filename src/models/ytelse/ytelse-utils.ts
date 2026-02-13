import type {
    ForeldrepengerFpSak,
    PeriodeDagpengerDto,
    Utbetalingsperioder
} from 'src/generated/modiapersonoversikt-api';
import {
    type Arbeidsavklaringspenger,
    getArbeidsavklaringspengerIdDato,
    getUnikArbeidsavklaringspengerKey
} from 'src/models/ytelse/arbeidsavklaringspenger';
import { getPeriodeDagpengerDtoIdDato, getUnikPeriodeDagpengerDtoKey } from 'src/models/ytelse/dagpenger';
import {
    type Foreldrepengerettighet,
    getForeldepengerIdDato,
    getUnikForeldrepengerKey
} from 'src/models/ytelse/foreldrepenger';
import { getForeldrepengerFpSakIdDato, getUnikForeldrepengerFpSakKey } from 'src/models/ytelse/foreldrepenger-fpsak';
import { getPensjonIdDato, getUnikPensjonKey, type Pensjon } from 'src/models/ytelse/pensjon';
import { getSykepengerSpokelseIdDato, getUnikSykepengerSpokelseKey } from 'src/models/ytelse/sykepenger-spokelse';
import { loggError } from 'src/utils/logger/frontendLogger';
import { getPleiepengerIdDato, getUnikPleiepengerKey, type Pleiepengerettighet } from './pleiepenger';
import { getSykepengerIdDato, getUnikSykepengerKey, type Sykepenger } from './sykepenger';
import { getTiltakspengerIdDato, getUnikTiltakspengerKey, type Tiltakspenger } from './tiltakspenger';

export enum YtelseVedtakYtelseType {
    Sykepenger = 'Sykepenger',
    Foreldrepenger = 'Foreldrepenger',
    Pleiepenger = 'Pleiepenger',
    Tiltakspenge = 'Tiltakspenger',
    Pensjon = 'Pensjon',
    Arbeidsavklaringspenger = 'Arbeidsavklaringspenger',
    ForeldrepengerFpSak = 'ForeldrepengerFpSak',
    PeriodeDagpengerDto = 'Dagpenger',
    SykepengerSpokelse = 'SykepengerSpokelse'
}

export type Ytelse =
    | Pleiepengerettighet
    | Foreldrepengerettighet
    | Sykepenger
    | Tiltakspenger
    | Pensjon
    | Arbeidsavklaringspenger
    | ForeldrepengerFpSak
    | PeriodeDagpengerDto
    | Utbetalingsperioder;

export function isSykepengerSpokelse(ytelse: Ytelse): ytelse is Utbetalingsperioder {
    return 'utbetaltePerioder' in ytelse;
}

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
export function isArbeidsavklaringspenger(ytelse: Ytelse): ytelse is Arbeidsavklaringspenger {
    return 'rettighetsType' in ytelse;
}
export function isForeldrePengerFpSak(ytelse: Ytelse): ytelse is ForeldrepengerFpSak {
    return 'ytelse' in ytelse;
}
export function isPeriodeDagpengerDto(ytelse: Ytelse): ytelse is PeriodeDagpengerDto {
    return 'ytelseType' in ytelse; // this one is unique... right now
}

export function getYtelseIdDato(ytelse: Ytelse) {
    if (isSykepengerSpokelse(ytelse)) {
        return getSykepengerSpokelseIdDato(ytelse);
    }
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
    if (isArbeidsavklaringspenger(ytelse)) {
        return getArbeidsavklaringspengerIdDato(ytelse);
    }
    if (isForeldrePengerFpSak(ytelse)) {
        return getForeldrepengerFpSakIdDato(ytelse);
    }
    if (isPeriodeDagpengerDto(ytelse)) {
        return getPeriodeDagpengerDtoIdDato(ytelse);
    }
    loggError(new Error('Matchet ingen ytelser / kunne ikke finne id-dato'));
    return 'ukjent dato';
}

export function getUnikYtelseKey(ytelse: Ytelse) {
    if (isSykepengerSpokelse(ytelse)) {
        return getUnikSykepengerSpokelseKey(ytelse);
    }
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
    if (isArbeidsavklaringspenger(ytelse)) {
        return getUnikArbeidsavklaringspengerKey(ytelse);
    }
    if (isArbeidsavklaringspenger(ytelse)) {
        return getUnikArbeidsavklaringspengerKey(ytelse);
    }
    if (isForeldrePengerFpSak(ytelse)) {
        return getUnikForeldrepengerFpSakKey(ytelse);
    }
    if (isForeldrePengerFpSak(ytelse)) {
        return getUnikPeriodeDagpengerDtoKey(ytelse);
    }
    loggError(new Error('Matchet ingen ytelser / kunne ikke finne ytelse-key'));
    return 'ukjent ytelse';
}
