export interface UtbetalingerResponse {
    utbetalinger: Utbetaling[];
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
    ytelseskomponenttype: string,
    satsbeløp?: number,
    satstype?: string,
    satsantall?: number,
    ytelseskomponentbeløp: number
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