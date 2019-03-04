import { Periode } from '../periode';

export interface HistoriskUtbetaling {
    vedtak: null | Periode;
    utbetalingsgrad: null | number;
    utbetalingsdato: null | string;
    nettobeløp: null | number;
    bruttobeløp: null | number;
    skattetrekk: null | number;
    arbeidsgiverNavn: null | string;
    arbeidsgiverOrgNr: null | string;
    dagsats: null | number;
    type: null | string;
    trekk: null | KreditorTrekk[];
}

export interface KommendeUtbetaling {
    vedtak: null | Periode;
    utbetalingsgrad: null | number;
    utbetalingsdato: null | string;
    bruttobeløp: null | number;
    arbeidsgiverNavn: null | string;
    arbeidsgiverKontonr: null | string;
    arbeidsgiverOrgNr: null | string;
    dagsats: null | number;
    saksbehandler: null | string;
    type: null | string;
}

export interface UtbetalingPåVent {
    vedtak: null | Periode;
    utbetalingsgrad: null | number;
    oppgjørstype: null | string;
    arbeidskategori: null | string;
    stansårsak: null | string;
    ferie1: null | Periode;
    ferie2: null | Periode;
    sanksjon: null | Periode;
    sykmeldt: null | Periode;
}

export interface KreditorTrekk {
    kreditorsNavn: string;
    beløp: number;
}
