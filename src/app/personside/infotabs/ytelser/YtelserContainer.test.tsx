import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../test/Testprovider';
import * as React from 'react';
import ValgtYtelse from './ValgtYtelse';

test('Om YtelserContainer matcher snapshot', () => {
    const resultat = renderer.create(
        <TestProvider>
            <ValgtYtelse />
        </TestProvider>
    );

    expect(resultat.toJSON()).toMatchSnapshot();
});
