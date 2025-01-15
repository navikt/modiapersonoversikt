import { render } from '@testing-library/react';
import { statiskMockYtelse } from '../../../../../mock/utbetalinger/statiskMockUtbetaling';
import UtbetalingsDetaljer from './UtbetalingsDetaljer';

test('Viser utbetalingsdetaljer riktig med liste med ytelser og trekk', () => {
    const visittkortheader = render(
        <UtbetalingsDetaljer konto="123" melding="Dette er en melding" ytelse={statiskMockYtelse} />
    );

    const json = visittkortheader.asFragment();
    expect(json).toMatchSnapshot();
});
