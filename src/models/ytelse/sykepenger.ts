import type { Periode } from '../tid';
import type { Arbeidsforhold } from './arbeidsforhold';
import type { KommendeUtbetaling, UtbetalingPaaVent } from './ytelse-utbetalinger';

export interface SykepengerResponse {
    sykepenger: Sykepenger[] | null;
}

export interface Sykepenger {
    fodselsnummer: string;
    sykmeldtFom: string;
    forbrukteDager: number;
    ferie1: null | Periode;
    ferie2: null | Periode;
    sanksjon: null | Periode;
    stansaarsak: null | string;
    unntakAktivitet: null | string;
    forsikring: null | Forsikring;
    sykmeldinger: Sykmelding[];
    kommendeUtbetalinger: KommendeUtbetaling[];
    utbetalingerPaaVent: UtbetalingPaaVent[];
    bruker: string;
    midlertidigStanset: null | string;
    slutt: null | string;
    arbeidsforholdListe: Arbeidsforhold[];
    erArbeidsgiverperiode: boolean;
    arbeidskategori: string;
}

export interface Forsikring {
    forsikringsordning: string;
    premiegrunnlag: number;
    erGyldig: boolean;
    forsikret: null | Periode;
}

export interface Sykmelding {
    sykmelder: string;
    behandlet: string;
    sykmeldt: Periode;
    sykmeldingsgrad: number;
    gjelderYrkesskade: null | Yrkesskade;
    gradAvSykmeldingListe: Gradering[];
}

export interface Yrkesskade {
    yrkesskadeart: string;
    skadet: string;
    vedtatt: string;
}

export interface Gradering {
    gradert: Periode;
    sykmeldingsgrad: number;
}

export function getSykepengerIdDato(sykepenger: Sykepenger) {
    return sykepenger.sykmeldtFom;
}

export function getUnikSykepengerKey(sykepenger: Sykepenger): string {
    return `sykepenger${getSykepengerIdDato(sykepenger)}`;
}
