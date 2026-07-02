import {
    HentVedtaksperioder200ResponseInnerKilde,
    HentVedtaksperioder200ResponseInnerRettighet
} from 'src/generated/modiapersonoversikt-api';
import type { Tiltakspenger } from 'src/models/ytelse/tiltakspenger';

export const statiskTiltakspengerMock: Tiltakspenger = {
    periode: {
        fraOgMed: '2020-01-10',
        tilOgMed: '2020-02-21'
    },
    vedtaksperiode: {
        fraOgMed: '2020-01-10',
        tilOgMed: '2020-02-21'
    },
    sats: 10,
    satsBarnetillegg: 100,
    innvilgelsesperioder: [],
    kilde: HentVedtaksperioder200ResponseInnerKilde.TPSAK,
    rettighet: HentVedtaksperioder200ResponseInnerRettighet.TILTAKSPENGER,
    vedtakId: '987sdfklo',
    barnetillegg: {
        perioder: [
            {
                periode: {
                    fraOgMed: '2020-01-20',
                    tilOgMed: '2020-02-21'
                },
                antallBarn: 1
            }
        ]
    }
};
