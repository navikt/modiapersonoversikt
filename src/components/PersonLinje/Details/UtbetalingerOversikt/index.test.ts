import type { Utbetaling } from 'src/generated/modiapersonoversikt-api';
import { utbetalingerForHjem } from './index';

const utbetaling = (dato: string): Utbetaling => ({
    posteringsdato: dato,
    utbetalingsdato: dato,
    erUtbetaltTilPerson: true,
    erUtbetaltTilOrganisasjon: false,
    erUtbetaltTilSamhandler: false,
    nettobelop: 100,
    metode: 'bank',
    status: 'utbetalt',
    ytelser: []
});

it('tar med grensene og kommende utbetalinger, men ikke eldre eller senere datoer', () => {
    const inn = [
        utbetaling('2026-08-28'),
        utbetaling('2026-08-29'),
        utbetaling('2026-09-28'),
        utbetaling('2026-10-28'),
        utbetaling('2026-10-29')
    ];
    expect(utbetalingerForHjem(inn, '2026-08-29', '2026-10-28').map((u) => u.utbetalingsdato)).toEqual([
        '2026-10-28',
        '2026-09-28',
        '2026-08-29'
    ]);
});

it('filtrerer på posteringsdato også når utbetalingsdatoen er en annen', () => {
    const innenfor = { ...utbetaling('2026-09-28'), utbetalingsdato: '2026-11-01' };
    const utenfor = { ...utbetaling('2026-01-01'), utbetalingsdato: '2026-09-28' };
    expect(utbetalingerForHjem([utenfor, innenfor], '2026-08-29', '2026-10-28')).toEqual([innenfor]);
});
