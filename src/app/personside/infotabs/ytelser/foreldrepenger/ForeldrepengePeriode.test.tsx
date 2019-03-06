import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { statiskForeldrepengeMock } from '../../../../../mock/ytelse/statiskForeldrepengeMock';
import ForeldrepengePeriode from './ForeldrepengePeriode';

test('Foreldrepengeperiode matcher snapshot', () => {
    const testRettighet = statiskForeldrepengeMock;
    const result = renderer.create(<ForeldrepengePeriode periode={testRettighet.periode[0]} periodenr={1} />);

    expect(result).toMatchSnapshot();
});
