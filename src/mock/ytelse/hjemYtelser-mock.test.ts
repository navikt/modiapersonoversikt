import dayjs from 'dayjs';
import { aktivSykmeldingsperiode } from 'src/components/PersonLinje/Details/YtelserOversikt';
import { aremark } from '../persondata/aremark';
import { getMockArbeidsavklaringspengerResponse } from './arbeidsavklaringspengerMock';
import { getMockSykepengerRespons } from './sykepenger-mock';

describe.skipIf(import.meta.env.VITE_E2E)('ytelsesdata for nye Hjem i lokalt mockmiljø', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2026-09-28T12:00:00'));
    });

    afterEach(() => vi.useRealTimers());

    it('har både aktivt og avsluttet Infotrygd-tilfelle med opphold mellom periodene', () => {
        const sykepenger = getMockSykepengerRespons(aremark.personIdent).sykepenger ?? [];
        const aktiv = sykepenger.find((ytelse) => ytelse.sykmeldtFom === '2026-09-14');
        const inaktiv = sykepenger.find((ytelse) => ytelse.sykmeldtFom === '2026-08-19');
        expect(aktivSykmeldingsperiode(aktiv?.sykmeldinger)).toEqual({
            fom: '2026-09-14',
            tom: '2026-10-12'
        });
        expect(aktivSykmeldingsperiode(inaktiv?.sykmeldinger)).toBeNull();
    });

    it('har aktive arbeidsavklaringspenger i tillegg', () => {
        const ytelser = getMockArbeidsavklaringspengerResponse(aremark.personIdent);
        expect(
            ytelser.some(
                (ytelse) =>
                    dayjs(ytelse.periode.fraOgMedDato).isBefore(dayjs(), 'day') &&
                    dayjs(ytelse.periode.tilOgMedDato).isAfter(dayjs(), 'day')
            )
        ).toBe(true);
    });
});
