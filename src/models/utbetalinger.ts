export interface UtbetalingerResponse {
    utbetalinger: Utbetaling[];
}

export interface Utbetaling {
    posteringsdato: string;
    utbetalingsdato: string | null;
    forfallsdato: string | null;
    utbetaltTil: string;
    nettobeløp: number;
    melding?: string;
    metode: string;
    status: string;
    konto?: string;
    ytelser?: Ytelse[];
}

export interface Ytelse {
    type: string | null;
    ytelseskomponentListe?: Ytelseskomponent[];
    ytelseskomponentersum: number;
    trekkListe?: Trekk[];
    trekksum: number;
    skattListe?: Skatt[];
    skattsum: number;
    nettobeløp: number;
    periode: YtelsePeriode;
    bilagsnummer?: string;
}

export interface Ytelseskomponent {
    ytelseskomponenttype: string;
    satsbeløp?: number;
    satstype?: string;
    satsantall?: number;
    ytelseskomponentbeløp: number;
}

export interface Trekk {
    trekktype: string;
    trekkbeløp: number;
    kreditor?: string;
}

export interface Skatt {
    skattebeløp: number;
}

export interface YtelsePeriode {
    start: string;
    slutt: string;
}