import { render } from '@testing-library/react';
import { statiskMockUtbetaling } from '../../../../../mock/utbetalinger/statiskMockUtbetaling';
import type { Utbetaling, UtbetalingerPeriode } from '../../../../../models/utbetalinger';
import TotaltUtbetaltDetaljer from './TotaltUtbetaltDetaljer';

Date.now = () => new Date().getTime(); // for å motvirke Date.now() mock i setupTests.ts

const periode: UtbetalingerPeriode = {
    startDato: '17-05-1905',
    sluttDato: '17-05-1905'
};

const mockUtbetalingUtenUtbetaltDato: Utbetaling = {
    ...statiskMockUtbetaling,
    utbetalingsdato: null
};

const mockUtbetalingReturnertForSaksbehandling: Utbetaling = {
    ...statiskMockUtbetaling,
    status: 'Returnert til NAV for saksbehandling'
};

test('Filtrerer bort utbetalinger som ikke skal medregnes og viser totalt-utbetalt-detaljer riktig', () => {
    vi.useRealTimers();
    const visittkortheader = render(
        <TotaltUtbetaltDetaljer
            visDetaljer={true}
            toggleVisDetaljer={() => null}
            periode={periode}
            utbetalinger={[
                statiskMockUtbetaling,
                statiskMockUtbetaling,
                mockUtbetalingUtenUtbetaltDato,
                mockUtbetalingReturnertForSaksbehandling
            ]}
        />
    );

    const json = visittkortheader.asFragment();
    expect(json).toMatchSnapshot();
});
