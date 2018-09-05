import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { statiskMockUtbetaling } from '../../../../mock/statiskMockUtbetaling';
import TotaltUtbetaltDetaljer from './TotaltUtbetaltDetaljer';
import { FilterState, PeriodeValg } from './Filter';
import { aremark } from '../../../../mock/person/aremark';
import { Utbetaling } from '../../../../models/utbetalinger';

Date.now = jest.fn(() => new Date()); // for å motvirke Date.now() mock i setupTests.ts

const filterState: FilterState = {
    periode: {
        radioValg: PeriodeValg.SISTE_30_DAGER,
        egendefinertPeriode: {
            fra: new Date(0),
            til: new Date(0)
        }
    },
    utbetaltTil: [aremark.navn.sammensatt],
    ytelser: ['Sykepenger']
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
            filter={filterState}
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
