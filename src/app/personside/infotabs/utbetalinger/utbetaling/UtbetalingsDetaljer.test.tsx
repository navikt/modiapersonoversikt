import * as renderer from 'react-test-renderer';
import UtbetalingsDetaljer from './UtbetalingsDetaljer';
import { statiskMockYtelse } from '../../../../../mock/utbetalinger/statiskMockUtbetaling';

test('Viser utbetalingsdetaljer riktig med liste med ytelser og trekk', () => {
    const visittkortheader = renderer.create(
        <UtbetalingsDetaljer konto="123" melding="Dette er en melding" ytelse={statiskMockYtelse} />
    );

    const json = visittkortheader.toJSON();
    expect(json).toMatchSnapshot();
});
