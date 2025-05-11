import { act } from '@testing-library/react';
import { statiskMockUtbetaling, statiskMockYtelse } from '../../../../../mock/utbetalinger/statiskMockUtbetaling';
import type { Utbetaling } from '../../../../../models/utbetalinger';
import { renderWithProviders } from '../../../../../test/Testprovider';
import SammensattUtbetaling from './SammensattUtbetaling';

const sammensattUtbetaling: Utbetaling = {
    ...statiskMockUtbetaling,
    ytelser: [statiskMockYtelse, statiskMockYtelse]
};

test('Viser utbetalingsdetaljer riktig med liste med ytelser og trekk', async () => {
    const visittkortheader = await act(() =>
        renderWithProviders(<SammensattUtbetaling utbetaling={sammensattUtbetaling} erValgtIUrl={false} />)
    );

    const json = visittkortheader.asFragment();
    expect(json).toMatchSnapshot();
});
