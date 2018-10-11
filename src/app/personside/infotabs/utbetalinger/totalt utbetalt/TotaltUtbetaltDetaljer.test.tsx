import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { statiskMockUtbetaling } from '../../../../../mock/statiskMockUtbetaling';
import TotaltUtbetaltDetaljer from './TotaltUtbetaltDetaljer';
import { FilterState, PeriodeValg } from '../filter/Filter';
import { aremark } from '../../../../../mock/person/aremark';
import { Utbetaling } from '../../../../../models/utbetalinger';
import { ReactNode } from 'react';

Date.now = jest.fn(() => new Date()); // for å motvirke Date.now() mock i setupTests.ts

// Mock react collapse sin UnmountClosed
jest.mock('react-collapse', () => {
    return {
        UnmountClosed: (props: {children: ReactNode}) => props.children
    };
});

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
            visDetaljer={true}
            toggleVisDetaljer={() => null}
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
