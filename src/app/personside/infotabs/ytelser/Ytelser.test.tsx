import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../test/Testprovider';
import * as React from 'react';
import Ytelser from './Ytelser';

test('Om Ytelser matcher snapshot', () => {
    const resultat = renderer.create(
        <TestProvider>
            <Ytelser />
        </TestProvider>
    );

    expect(resultat.toJSON()).toMatchSnapshot();
});
