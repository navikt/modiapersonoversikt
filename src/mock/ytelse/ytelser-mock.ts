import { pleiepengerTestData } from 'src/app/personside/infotabs/ytelser/pleiepenger/pleiepengerTestData';
import type { YtelseResponse } from 'src/generated/modiapersonoversikt-api';
import { YtelseVedtakYtelseType } from 'src/generated/modiapersonoversikt-api';
import { aremark } from 'src/mock/persondata/aremark';
import { statiskForeldrepengeMockNy } from 'src/mock/ytelse/statiskForeldrepengeMock';
import { statiskPensjonMock } from 'src/mock/ytelse/statiskPensjonMock';
import { statiskSykepengerMock } from 'src/mock/ytelse/statiskSykepengerMock';
import { statiskTiltakspengerMock } from 'src/mock/ytelse/statiskTiltakspengerMock';

export function getMockYtelserRespons(fnr: string): YtelseResponse {
    const foreldrePenger = {
        ytelseType: YtelseVedtakYtelseType.Foreldrepenger,
        ytelseData: { data: statiskForeldrepengeMockNy }
    };
    const sykePenger = { ytelseType: YtelseVedtakYtelseType.Sykepenger, ytelseData: { data: statiskSykepengerMock } };
    const pleiePenger = { ytelseType: YtelseVedtakYtelseType.Pleiepenger, ytelseData: { data: pleiepengerTestData } };
    const tiltakPenger = {
        ytelseType: YtelseVedtakYtelseType.Tiltakspenge,
        ytelseData: { data: statiskTiltakspengerMock }
    };
    const pensjon = { ytelseType: YtelseVedtakYtelseType.Pensjon, ytelseData: { data: statiskPensjonMock } };

    if (fnr === aremark.personIdent) {
        return {
            ytelser: [foreldrePenger, sykePenger, pleiePenger, tiltakPenger, pensjon]
        };
    }

    return { ytelser: [] };
}
