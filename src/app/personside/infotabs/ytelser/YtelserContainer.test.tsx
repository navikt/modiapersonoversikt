import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../test/Testprovider';
import * as React from 'react';
import YtelserContainer from './YtelserContainer';

test('Om YtelserContainer matcher snapshot', () => {
    const resultat = renderer.create(
        <TestProvider>
            <YtelserContainer />
        </TestProvider>
    );

    expect(resultat.toJSON()).toMatchSnapshot();
});
