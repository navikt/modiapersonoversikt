import dayjs from 'dayjs';
import type { SykmeldingItem } from 'src/generated/modiapersonoversikt-api';
import { aktivSykmeldingsperiode } from './index';

const iDag = dayjs('2026-09-28');
const sykmelding = (fra?: string, til?: string): SykmeldingItem => ({ sykmeldt: { fra, til } });

describe('Infotrygd-perioder på Hjem', () => {
    it('finner en aktiv sykmelding når et tidligere intervall er avsluttet', () => {
        expect(
            aktivSykmeldingsperiode(
                [sykmelding('2026-01-01', '2026-02-01'), sykmelding('2026-09-01', '2026-09-28')],
                iDag
            )
        ).toEqual({ fom: '2026-09-01', tom: '2026-09-28' });
    });

    it('viser ikke et tilfelle i opphold mellom to sykmeldinger', () => {
        expect(
            aktivSykmeldingsperiode(
                [sykmelding('2026-01-01', '2026-02-01'), sykmelding('2026-10-01', '2026-11-01')],
                iDag
            )
        ).toBeNull();
    });

    it('viser ikke utløpte, fremtidige eller ufullstendige perioder', () => {
        expect(aktivSykmeldingsperiode([sykmelding('2026-01-01', '2026-01-31')], iDag)).toBeNull();
        expect(aktivSykmeldingsperiode([sykmelding('2026-10-01', '2026-11-01')], iDag)).toBeNull();
        expect(aktivSykmeldingsperiode([sykmelding('2026-09-01')], iDag)).toBeNull();
        expect(aktivSykmeldingsperiode([], iDag)).toBeNull();
    });
});
