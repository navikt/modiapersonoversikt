import type { Periode } from '../tid';

export interface KommendeUtbetaling {
    vedtak: null | Periode;
    utbetalingsgrad: null | number;
    utbetalingsdato: null | string;
    bruttobelop: null | number;
    arbeidsgiverNavn: null | string;
    arbeidsgiverKontonr: null | string;
    arbeidsgiverOrgNr: null | string;
    dagsats: null | number;
    saksbehandler: null | string;
    type: null | string;
}

export interface UtbetalingPaaVent {
    vedtak: null | Periode;
    utbetalingsgrad: null | number;
    oppgjorstype: null | string;
    arbeidskategori: null | string;
    stansaarsak: null | string;
    ferie1: null | Periode;
    ferie2: null | Periode;
    sanksjon: null | Sanksjonsperiode;
    sykmeldt: null | Periode;
}

interface Sanksjonsperiode {
    fra: string;
    til: string | null;
}
