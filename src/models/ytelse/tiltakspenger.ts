export type TiltakspengerResource = Tiltakspenger[] | null;

export interface Tiltakspenger {
    fom: string;
    tom: string;
    relaterteTiltak: string;
    rettighet: 'TILTAKSPENGER';
    vedtakId: string;
    antallDager?: number;
    dagsatsTiltakspenger?: number;
    dagsatsBarnetillegg?: number;
    antallBarn?: number;
}

export function getTiltakspengerIdDato(ytelse: Tiltakspenger) {
    return ytelse.fom;
}

export function getUnikTiltakspengerKey(ytelse: Tiltakspenger) {
    return 'tiltakspenger' + ytelse.vedtakId;
}
