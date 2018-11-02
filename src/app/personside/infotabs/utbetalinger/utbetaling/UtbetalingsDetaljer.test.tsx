import * as React from 'react';
import * as renderer from 'react-test-renderer';
import UtbetalingsDetaljer from './UtbetalingsDetaljer';
import { statiskMockYtelse } from '../../../../../mock/statiskMockUtbetaling';
import { ReactNode } from 'react';

// Mock react collapse sin UnmountClosed
jest.mock('react-collapse', () => {
    return {
        UnmountClosed: (props: {children: ReactNode}) => props.children
    };
});

test('Viser utbetalingsdetaljer riktig med liste med ytelser og trekk', () => {
    const visittkortheader = renderer.create(
        <UtbetalingsDetaljer
            konto="123"
            melding="Dette er en melding"
            ytelse={statiskMockYtelse}
        />
    );

    const json = visittkortheader.toJSON();
    expect(json).toMatchSnapshot();
});
