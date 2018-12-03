import { Periode } from '../periode';
import { HistoriskUtbetaling, KommendeUtbetaling, UtbetalingPåVent } from './ytelse-utbetalinger';

export interface SykepengerResponse {
    sykepenger: Sykmeldingsperiode[] | null;
}

export interface Sykmeldingsperiode {
    fødselsnummer: string;
    sykmeldtFom: string;
    forbrukteDager: number;
    ferie1?: Periode;
    ferie2?: Periode;
    sanksjon?: Periode;
    stansårsak?: string;
    unntakAktivitet?: string;
    forsikring?: Forsikring;
    sykmeldinger: Sykmelding[];
    historiskeUtbetalinger: HistoriskUtbetaling[];
    kommendeUtbetalinger: KommendeUtbetaling[];
    utbetalingerPåVent: UtbetalingPåVent[];
    bruker: string;
    midlertidigStanset?: string;
}

export interface Forsikring {
    forsikringsordning: string;
    premiegrunnlag: number;
    erGyldig: boolean;
    forsikret?: Periode;
}

export interface Sykmelding {
    sykmelder: string;
    behandlet: string;
    sykmeldt: Periode;
    sykmeldingsgrad: number;
    gjelderYrkesskade?: Yrkesskade;
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