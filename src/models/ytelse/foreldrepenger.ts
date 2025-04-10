import dayjs from 'dayjs';
import { backendDatoformat } from 'src/utils/date-utils';
import type { Periode } from '../tid';
import type { Arbeidsforhold } from './arbeidsforhold';
import type { KommendeUtbetaling } from './ytelse-utbetalinger';

export interface ForeldrepengerResponse {
    foreldrepenger: Foreldrepengerettighet[] | null;
}

export interface Adopsjon extends Foreldrepengerettighet {
    omsorgsovertakelse: string;
}

export function isAdopsjon(foreldrepenger: Foreldrepengerettighet): foreldrepenger is Adopsjon {
    return !!(foreldrepenger as Adopsjon).omsorgsovertakelse;
}

export interface Fodsel extends Foreldrepengerettighet {
    termin: string;
}

export function isFodsel(foreldrepenger: Foreldrepengerettighet): foreldrepenger is Fodsel {
    return !!(foreldrepenger as Fodsel).termin;
}

export interface Foreldrepengerettighet {
    forelder: string;
    andreForeldersFnr: string | null;
    antallBarn: number | null;
    barnetsFodselsdato: string | null;
    dekningsgrad: number;
    fedrekvoteTom: string | null;
    modrekvoteTom: string | null;
    foreldrepengetype: string | null;
    graderingsdager: number | null;
    restDager: number;
    rettighetFom: string | null;
    eldsteIdDato: string | null;
    foreldreAvSammeKjonn: string | null;
    periode: Foreldrepengerperiode[];
    slutt: string | null;
    arbeidsforhold: Arbeidsforhold[];
    erArbeidsgiverperiode: boolean | null;
    arbeidskategori: string | null;
}

export interface Foreldrepengerperiode {
    fodselsnummer: string;
    harAleneomsorgFar: boolean | null;
    harAleneomsorgMor: boolean | null;
    arbeidsprosentMor: number | null;
    avslagsaarsak: string | null;
    avslaatt: string | null;
    disponibelGradering: number | null;
    erFedrekvote: boolean | null;
    erModrekvote: boolean | null;
    forskyvelsesaarsak1: string | null;
    forskyvelsesperiode1: Periode | null;
    forskyvelsesaarsak2: string | null;
    forskyvelsesperiode2: Periode | null;
    foreldrepengerFom: string;
    midlertidigStansDato: string | null;
    morSituasjon: string | null;
    rettTilFedrekvote: string;
    rettTilModrekvote: string;
    stansaarsak: string | null;
    kommendeUtbetalinger: KommendeUtbetaling[];
}

export function getForeldepengerIdDato(foreldrepenger: Foreldrepengerettighet) {
    return foreldrepenger.rettighetFom ? foreldrepenger.rettighetFom : dayjs().format(backendDatoformat);
}

export function getUnikForeldrepengerKey(foreldrepenger: Foreldrepengerettighet): string {
    return `foreldrepenger${getForeldepengerIdDato(foreldrepenger)}`;
}
