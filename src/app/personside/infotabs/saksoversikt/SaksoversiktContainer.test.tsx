import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../test/Testprovider';
import SaksoversiktContainer from './SaksoversiktContainer';
import { setupReactQueryMocks } from '../../../../test/testStore';

test('Viser saksoversiktcontainer med alt innhold', () => {
    setupReactQueryMocks();
    const container = renderer.create(
        <TestProvider>
            <SaksoversiktContainer />
        </TestProvider>
    );

    const json = container.toJSON();
    expect(json).toMatchSnapshot();
});
