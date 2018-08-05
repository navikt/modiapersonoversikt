export interface UtbetalingerResponse {
    utbetalinger?: Utbetaling[];
}

export interface Utbetaling {
    posteringsdato: string;
    utbetalingsdato?: string;
    forfallsdato?: string;
    utbetaltTil: string;
    nettobeløp: number;
    melding?: string;
    metode: string;
    status: string;
    konto?: string;
    ytelser?: Ytelse[];
}

export interface Ytelse {
    type: string;
    nettobeløp: number;
    periode: YtelsePeriode;
}

export interface YtelsePeriode {
    start: string;
    slutt: string;
}