import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Foreldrepenger from './ForeldrePenger';
import { statiskForeldrepengeMock } from '../../../../../mock/ytelse/statiskForeldrepengeMock';
import TestProvider from '../../../../../test/Testprovider';

test('Foreldrepengeperiode matcher snapshot', () => {
    const testRettighet = statiskForeldrepengeMock;
    const result = renderer.create(
        <TestProvider>
            <Foreldrepenger foreldrepenger={testRettighet} />
        </TestProvider>
    );

    expect(result).toMatchSnapshot();
});
