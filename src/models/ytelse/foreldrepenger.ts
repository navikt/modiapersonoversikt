import { Periode } from '../periode';
import { HistoriskUtbetaling, KommendeUtbetaling } from './ytelse-utbetalinger';

export interface ForeldrepengerResponse {
    foreldrepenger?: Foreldrepengerrettighet;
}

export interface Foreldrepengerrettighet {
    forelder: string;
    andreForeldersFnr?: string;
    antallBarn?: number;
    barnetsFødselsdato?: string;
    dekningsgrad: number;
    fedrekvoteTom?: string;
    mødrekvoteTom?: string;
    foreldrepengetype?: string;
    graderingsdager?: number;
    restDager: number;
    rettighetFom?: string;
    eldsteIdDato?: string;
    foreldreAvSammeKjønn?: string;
    periode?: Foreldrepengerperiode[];
}

export interface Foreldrepengerperiode {
    fødselsnummer: string;
    harAleneomsorgFar?: boolean;
    harAleneomsorgMor?: boolean;
    arbeidsprosentMor?: number;
    avslagsårsak?: string;
    avslått?: string;
    disponibelGradering?: number;
    erFedrekvote?: boolean;
    erMødrekvote?: boolean;
    forskyvelsesårsak1?: string;
    forskyvelsesperiode1?: Periode;
    forskyvelsesårsak2?: string;
    forskyvelsesperiode2?: Periode;
    foreldrepengerFom: string;
    midlertidigStansDato?: string;
    morSituasjon?: string;
    rettTilFedrekvote: string;
    rettTilMødrekvote: string;
    stansårsak?: string;
    historiskeUtbetalinger?: HistoriskUtbetaling[];
    kommendeUtbetalinger?: KommendeUtbetaling[];
}