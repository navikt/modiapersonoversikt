import * as renderer from 'react-test-renderer';
import { statiskForeldrepengeMock } from '../../../../../mock/ytelse/statiskForeldrepengeMock';
import TestProvider from '../../../../../test/Testprovider';
import ForeldrepengePeriode from './ForeldrepengePeriode';

test('Foreldrepengeperiode matcher snapshot', () => {
    const testRettighet = statiskForeldrepengeMock;
    const result = renderer.create(
        <TestProvider>
            <ForeldrepengePeriode periode={testRettighet.periode[0]} periodenr={1} />
        </TestProvider>
    );

    expect(result).toMatchSnapshot();
});
