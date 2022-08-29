export interface UtbetalingerPeriode {
    startDato: string;
    sluttDato: string;
}

export interface UtbetalingerResponse {
    utbetalinger: Utbetaling[];
    periode: UtbetalingerPeriode;
}

export interface Utbetaling {
    posteringsdato: string;
    utbetalingsdato: string | null;
    forfallsdato: string | null;
    utbetaltTil: string;
    erUtbetaltTilPerson: boolean;
    erUtbetaltTilOrganisasjon: boolean;
    erUtbetaltTilSamhandler: boolean;
    nettobelop: number;
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
    nettobelop: number;
    periode: YtelsePeriode;
    bilagsnummer?: string;
    arbeidsgiver: null | Arbeidsgiver;
}

export interface Ytelseskomponent {
    ytelseskomponenttype: string;
    satsbelop?: number;
    satstype?: string;
    satsantall?: number;
    ytelseskomponentbelop: number;
}

export interface Trekk {
    trekktype: string;
    trekkbelop: number;
    kreditor: string | null;
}

export interface Skatt {
    skattebelop: number;
}

export interface YtelsePeriode {
    start: string;
    slutt: string;
}

export interface Arbeidsgiver {
    orgnr: string;
    navn: string;
}
