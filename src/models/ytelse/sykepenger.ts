import { Periode } from '../periode';
import { HistoriskUtbetaling, KommendeUtbetaling, UtbetalingPåVent } from './ytelse-utbetalinger';
import { Arbeidsforhold } from './arbeidsforhold';

export interface SykepengerResponse {
    sykepenger: Sykepenger[] | null;
}

export interface Sykepenger {
    fødselsnummer: string;
    sykmeldtFom: string;
    forbrukteDager: number;
    ferie1: null | Periode;
    ferie2: null | Periode;
    sanksjon: null | Periode;
    stansårsak: null | string;
    unntakAktivitet: null | string;
    forsikring: null | Forsikring;
    sykmeldinger: Sykmelding[];
    historiskeUtbetalinger: HistoriskUtbetaling[];
    kommendeUtbetalinger: KommendeUtbetaling[];
    utbetalingerPåVent: UtbetalingPåVent[];
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
