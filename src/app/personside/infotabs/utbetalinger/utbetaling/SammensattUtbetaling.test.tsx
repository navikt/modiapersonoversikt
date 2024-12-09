import * as renderer from 'react-test-renderer';
import { statiskMockUtbetaling, statiskMockYtelse } from '../../../../../mock/utbetalinger/statiskMockUtbetaling';
import type { Utbetaling } from '../../../../../models/utbetalinger';
import TestProvider from '../../../../../test/Testprovider';
import SammensattUtbetaling from './SammensattUtbetaling';

const sammensattUtbetaling: Utbetaling = {
    ...statiskMockUtbetaling,
    ytelser: [statiskMockYtelse, statiskMockYtelse]
};

test('Viser utbetalingsdetaljer riktig med liste med ytelser og trekk', () => {
    const visittkortheader = renderer.create(
        <TestProvider>
            <SammensattUtbetaling utbetaling={sammensattUtbetaling} erValgtIUrl={false} />
        </TestProvider>
    );

    const json = visittkortheader.toJSON();
    expect(json).toMatchSnapshot();
});
