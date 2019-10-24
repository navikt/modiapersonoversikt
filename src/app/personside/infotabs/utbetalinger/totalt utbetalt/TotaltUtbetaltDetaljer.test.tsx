import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { statiskMockUtbetaling } from '../../../../../mock/utbetalinger/statiskMockUtbetaling';
import TotaltUtbetaltDetaljer from './TotaltUtbetaltDetaljer';
import { Utbetaling, UtbetalingerPeriode } from '../../../../../models/utbetalinger';

Date.now = jest.fn(() => new Date()); // for å motvirke Date.now() mock i setupTests.ts

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
    const visittkortheader = renderer.create(
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

    const json = visittkortheader.toJSON();
    expect(json).toMatchSnapshot();
});
