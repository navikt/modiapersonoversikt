import type { VedtakDto } from 'src/generated/modiapersonoversikt-api';

export type TiltakspengerResource = Tiltakspenger[] | null;

export type Tiltakspenger = VedtakDto;

export function getTiltakspengerIdDato(ytelse: Tiltakspenger) {
    return ytelse.periode.fraOgMed;
}

export function getUnikTiltakspengerKey(ytelse: Tiltakspenger) {
    return `tiltakspenger${ytelse.vedtakId}`;
}
