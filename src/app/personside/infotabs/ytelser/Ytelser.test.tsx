import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../test/Testprovider';
import * as React from 'react';
import Ytelser from './Ytelser';
import { setupReactQueryMocks } from '../../../../test/testStore';

test('Om Ytelser matcher snapshot', () => {
    setupReactQueryMocks();
    const resultat = renderer.create(
        <TestProvider>
            <Ytelser />
        </TestProvider>
    );

    expect(resultat.toJSON()).toMatchSnapshot();
});
