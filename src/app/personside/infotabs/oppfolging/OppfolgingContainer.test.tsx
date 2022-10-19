import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../test/Testprovider';
import OppfolgingContainer from './OppfolgingContainer';
import { setupReactQueryMocks } from '../../../../test/testStore';

test('Viser oppfølgingcontainer med alt innhold', () => {
    setupReactQueryMocks();
    const container = renderer.create(
        <TestProvider>
            <OppfolgingContainer />
        </TestProvider>
    );

    const json = container.toJSON();
    expect(json).toMatchSnapshot();
});
