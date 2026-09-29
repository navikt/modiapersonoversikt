import dayjs from 'dayjs';
import { aremark } from '../persondata/aremark';
import { getMockUtbetalinger } from './utbetalinger-mock';

describe.skipIf(import.meta.env.VITE_E2E)('utbetalingsdata for nye Hjem i lokalt mockmiljø', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2026-09-28T12:00:00'));
    });

    afterEach(() => vi.useRealTimers());

    it('har sju utbetalinger, én kommende og én med to ytelser', () => {
        const utbetalinger = getMockUtbetalinger(
            aremark.personIdent,
            dayjs().subtract(30, 'day').format('YYYY-MM-DD'),
            dayjs().add(30, 'day').format('YYYY-MM-DD')
        ).utbetalinger;

        expect(utbetalinger).toHaveLength(7);
        expect(utbetalinger.filter((utbetaling) => utbetaling.ytelser?.length === 2)).toHaveLength(1);
        expect(
            utbetalinger.filter((utbetaling) => dayjs(utbetaling.forfallsdato).isAfter(dayjs(), 'day'))
        ).toHaveLength(1);
        expect(
            utbetalinger.every(
                (utbetaling) =>
                    utbetaling.nettobelop === utbetaling.ytelser?.reduce((sum, ytelse) => sum + ytelse.nettobelop, 0)
            )
        ).toBe(true);
    });

    it('respekterer periodefilteret i mock-API-et', () => {
        expect(
            getMockUtbetalinger(
                aremark.personIdent,
                dayjs().subtract(3, 'day').format('YYYY-MM-DD'),
                dayjs().add(30, 'day').format('YYYY-MM-DD')
            ).utbetalinger
        ).toHaveLength(2);
    });
});
