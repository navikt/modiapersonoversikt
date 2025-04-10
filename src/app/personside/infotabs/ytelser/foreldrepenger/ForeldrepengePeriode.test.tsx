import { render } from '@testing-library/react';
import { statiskForeldrepengeMock } from 'src/mock/ytelse/statiskForeldrepengeMock';
import TestProvider from '../../../../../test/Testprovider';
import ForeldrepengePeriode from './ForeldrepengePeriode';

test('Foreldrepengeperiode matcher snapshot', () => {
    const testRettighet = statiskForeldrepengeMock;
    const result = render(
        <TestProvider>
            <ForeldrepengePeriode periode={testRettighet.periode[0]} periodenr={1} />
        </TestProvider>
    );

    expect(result.asFragment()).toMatchSnapshot();
});
