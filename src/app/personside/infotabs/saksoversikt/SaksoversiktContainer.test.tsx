import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../test/Testprovider';
import SaksoversiktContainer from './SaksoversiktContainer';
import SakstemaContextProvider from './SakstemaContext';

test('Viser saksoversiktcontainer med alt innhold', () => {
    const container = renderer.create(
        <TestProvider>
            <SakstemaContextProvider>
                <SaksoversiktContainer />
            </SakstemaContextProvider>
        </TestProvider>
    );

    const json = container.toJSON();
    expect(json).toMatchSnapshot();
});
