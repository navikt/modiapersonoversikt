import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Foreldrepenger from './ForeldrePenger';
import { statiskForeldrepengeMock } from '../../../../../mock/ytelse/statiskForeldrepengeMock';

test('Foreldrepengeperiode matcher snapshot', () => {
    const testRettighet = statiskForeldrepengeMock;
    const result = renderer.create(<Foreldrepenger foreldrepenger={testRettighet} />);

    expect(result).toMatchSnapshot();
});
