import type { Ytelse } from 'src/models/utbetalinger';

export interface UtbetalingerState {
    ytelseIFokus: Ytelse | null;
    ekspanderteYtelser: Ytelse[];
    filter: UtbetalingFilterState;
}

export interface UtbetalingFilterState {
    periode: PeriodeOptions;
    utbetaltTil: Array<string>;
    ytelser: Record<string, boolean>;
}

export interface PeriodeOptions {
    radioValg: PeriodeValg;
    egendefinertPeriode: FraTilDato;
}

export enum PeriodeValg {
    SISTE_30_DAGER = 'Siste 30 dager',
    INNEVERENDE_AR = 'Inneværende år',
    I_FJOR = 'I fjor',
    EGENDEFINERT = 'Egendefinert'
}

export interface FraTilDato {
    fra: string;
    til: string;
}
