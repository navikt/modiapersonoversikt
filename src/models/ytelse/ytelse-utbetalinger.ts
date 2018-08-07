import { Periode } from '../periode';

export interface HistoriskUtbetaling {
    vedtak?: Periode;
    utbetalingsgrad?: number;
    utbetalingsdato?: string;
    nettobeløp?: number;
    bruttobeløp?: number;
    skattetrekk?: number;
    arbeidsgiverNavn?: string;
    arbeidsgiverOrgNr?: string;
    dagsats?: number;
    type?: string;
    trekk?: KreditorTrekk[];
}

export interface KommendeUtbetaling {
    vedtak?: Periode;
    utbetalingsgrad?: number;
    utbetalingsdato?: string;
    bruttobeløp?: number;
    arbeidsgiverNavn?: string;
    arbeidsgiverKontonr?: string;
    arbeidsgiverOrgNr?: string;
    dagsats?: number;
    saksbehandler?: string;
    type?: string;
}

export interface UtbetalingPåVent {
    vedtak?: Periode;
    utbetalingsgrad?: number;
    oppgjørstype?: string;
    arbeidskategori?: string;
    stansårsak?: string;
    ferie1?: Periode;
    ferie2?: Periode;
    sanksjon?: Periode;
    sykmeldt?: Periode;
}

export interface KreditorTrekk {
    kreditorsNavn: string;
    beløp: number;
}