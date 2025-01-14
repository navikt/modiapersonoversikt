import { render } from '@testing-library/react';
import { statiskMockUtbetaling, statiskMockYtelse } from '../../../../../mock/utbetalinger/statiskMockUtbetaling';
import type { Utbetaling } from '../../../../../models/utbetalinger';
import TestProvider from '../../../../../test/Testprovider';
import SammensattUtbetaling from './SammensattUtbetaling';

const sammensattUtbetaling: Utbetaling = {
    ...statiskMockUtbetaling,
    ytelser: [statiskMockYtelse, statiskMockYtelse]
};

test('Viser utbetalingsdetaljer riktig med liste med ytelser og trekk', () => {
    const visittkortheader = render(
        <TestProvider>
            <SammensattUtbetaling utbetaling={sammensattUtbetaling} erValgtIUrl={false} />
        </TestProvider>
    );

    const json = visittkortheader.asFragment();
    expect(json).toMatchSnapshot();
});
