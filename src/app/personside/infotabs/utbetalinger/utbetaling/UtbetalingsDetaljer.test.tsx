import * as React from 'react';
import * as renderer from 'react-test-renderer';
import UtbetalingsDetaljer from './UtbetalingsDetaljer';
import { statiskMockYtelse } from '../../../../../mock/statiskMockUtbetaling';

test('Viser utbetalingsdetaljer riktig med liste med ytelser og trekk', () => {
    const visittkortheader = renderer.create(
        <UtbetalingsDetaljer
            konto="123"
            melding="Dette er en melding"
            ytelse={statiskMockYtelse}
            open={true}
            toggleVisDetaljer={() => null}
        />
    );

    const json = visittkortheader.toJSON();
    expect(json).toMatchSnapshot();
});
