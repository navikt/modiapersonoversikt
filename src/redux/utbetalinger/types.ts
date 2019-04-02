import { Ytelse } from '../../models/utbetalinger';

export interface UtbetalingerState {
    ytelseIFokus: Ytelse | null;
    ekspanderteYtelser: Ytelse[];
    filter: UtbetalingFilterState;
}

export interface UtbetalingFilterState {
    periode: PeriodeOptions;
    utbetaltTil: Array<string>;
    ytelser: Array<string>;
}

interface PeriodeOptions {
    radioValg: PeriodeValg;
    egendefinertPeriode: FraTilDato;
}

export enum PeriodeValg {
    SISTE_30_DAGER = 'Siste 30 dager',
    INNEVÆRENDE_ÅR = 'Inneværende år',
    I_FJOR = 'I fjor',
    EGENDEFINERT = 'Egendefinert'
}

export interface FraTilDato {
    fra: Date;
    til: Date;
}

interface PeriodeOptions {
    radioValg: PeriodeValg;
    egendefinertPeriode: FraTilDato;
}
