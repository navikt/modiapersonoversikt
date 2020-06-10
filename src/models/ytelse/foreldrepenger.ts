import { Periode } from '../periode';
import { KommendeUtbetaling } from './ytelse-utbetalinger';
import { Arbeidsforhold } from './arbeidsforhold';
import moment from 'moment';
import { backendDatoformat } from '../../utils/dateUtils';

export interface ForeldrepengerResponse {
    foreldrepenger: Foreldrepengerettighet[] | null;
}

export interface Adopsjon extends Foreldrepengerettighet {
    omsorgsovertakelse: string;
}

export function isAdopsjon(foreldrepenger: Foreldrepengerettighet): foreldrepenger is Adopsjon {
    return !!(foreldrepenger as Adopsjon).omsorgsovertakelse;
}

export interface Fødsel extends Foreldrepengerettighet {
    termin: string;
}

export function isFødsel(foreldrepenger: Foreldrepengerettighet): foreldrepenger is Fødsel {
    return !!(foreldrepenger as Fødsel).termin;
}

export interface Foreldrepengerettighet {
    forelder: string;
    andreForeldersFnr: string | null;
    antallBarn: number | null;
    barnetsFødselsdato: string | null;
    dekningsgrad: number;
    fedrekvoteTom: string | null;
    mødrekvoteTom: string | null;
    foreldrepengetype: string | null;
    graderingsdager: number | null;
    restDager: number;
    rettighetFom: string | null;
    eldsteIdDato: string | null;
    foreldreAvSammeKjønn: string | null;
    periode: Foreldrepengerperiode[];
    slutt: string | null;
    arbeidsforhold: Arbeidsforhold[];
    erArbeidsgiverperiode: boolean | null;
    arbeidskategori: string | null;
}

export interface Foreldrepengerperiode {
    fødselsnummer: string;
    harAleneomsorgFar: boolean | null;
    harAleneomsorgMor: boolean | null;
    arbeidsprosentMor: number | null;
    avslagsårsak: string | null;
    avslått: string | null;
    disponibelGradering: number | null;
    erFedrekvote: boolean | null;
    erMødrekvote: boolean | null;
    forskyvelsesårsak1: string | null;
    forskyvelsesperiode1: Periode | null;
    forskyvelsesårsak2: string | null;
    forskyvelsesperiode2: Periode | null;
    foreldrepengerFom: string;
    midlertidigStansDato: string | null;
    morSituasjon: string | null;
    rettTilFedrekvote: string;
    rettTilMødrekvote: string;
    stansårsak: string | null;
    kommendeUtbetalinger: KommendeUtbetaling[];
}

export function getForeldepengerIdDato(foreldrepenger: Foreldrepengerettighet) {
    return foreldrepenger.rettighetFom ? foreldrepenger.rettighetFom : moment().format(backendDatoformat);
}

export function getUnikForeldrepengerKey(foreldrepenger: Foreldrepengerettighet): string {
    return 'foreldrepenger' + getForeldepengerIdDato(foreldrepenger);
}
