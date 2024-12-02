import * as renderer from 'react-test-renderer';
import SammensattUtbetaling from './SammensattUtbetaling';
import { Utbetaling } from '../../../../../models/utbetalinger';
import { statiskMockUtbetaling, statiskMockYtelse } from '../../../../../mock/utbetalinger/statiskMockUtbetaling';
import TestProvider from '../../../../../test/Testprovider';

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
