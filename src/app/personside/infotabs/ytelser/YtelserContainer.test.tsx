import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../test/Testprovider';
import * as React from 'react';
import YtelserContainer from './YtelserContainer';

beforeEach(() => {
    Date.prototype.getTime = jest.fn(() => 0);
    Date.parse = jest.fn(() => 0);
});

test('Om YtelserContainer matcher snapshot', () => {
    const resultat = renderer.create(
        <TestProvider>
            <YtelserContainer />
        </TestProvider>
    );

    expect(resultat.toJSON()).toMatchSnapshot();
});
