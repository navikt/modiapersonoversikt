import type {
    HentVedtaksperioder200ResponseInner,
    HentVedtaksperioder200ResponseInnerBarnetilleggPerioderInner
} from 'src/generated/modiapersonoversikt-api';
export type Tiltakspenger = HentVedtaksperioder200ResponseInner;
export type TiltakspengerBarnetilleggPeriode = HentVedtaksperioder200ResponseInnerBarnetilleggPerioderInner;

export function getTiltakspengerIdDato(ytelse: Tiltakspenger) {
    return ytelse.periode.fraOgMed;
}

export function getUnikTiltakspengerKey(ytelse: Tiltakspenger) {
    return `tiltakspenger${ytelse.vedtakId}`;
}
