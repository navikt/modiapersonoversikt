import * as React from 'react';
import * as renderer from 'react-test-renderer';
import SammensattUtbetaling from './SammensattUtbetaling';
import { Utbetaling } from '../../../../../models/utbetalinger';
import { statiskMockUtbetaling, statiskMockYtelse } from '../../../../../mock/statiskMockUtbetaling';
import TestProvider from '../../../../../test/Testprovider';

// Mock react collapse sin UnmountClosed
jest.mock('react-collapse', () => {
    return {
        // @ts-ignore
        UnmountClosed: props => props.children
    };
});

const sammensattUtbetaling: Utbetaling = {
    ...statiskMockUtbetaling,
    ytelser: [statiskMockYtelse, statiskMockYtelse]
};

test('Viser utbetalingsdetaljer riktig med liste med ytelser og trekk', () => {
    const visittkortheader = renderer.create(
        <TestProvider>
            <SammensattUtbetaling utbetaling={sammensattUtbetaling} />
        </TestProvider>
    );

    const json = visittkortheader.toJSON();
    expect(json).toMatchSnapshot();
});
