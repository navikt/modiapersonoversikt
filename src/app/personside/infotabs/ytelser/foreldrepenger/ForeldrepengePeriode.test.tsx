import { act } from '@testing-library/react';
import { statiskForeldrepengeMock } from 'src/mock/ytelse/statiskForeldrepengeMock';
import { renderWithProviders } from '../../../../../test/Testprovider';
import ForeldrepengePeriode from './ForeldrepengePeriode';

test('Foreldrepengeperiode matcher snapshot', async () => {
    const testRettighet = statiskForeldrepengeMock;
    const result = await act(() =>
        renderWithProviders(<ForeldrepengePeriode periode={testRettighet.periode[0]} periodenr={1} />)
    );

    expect(result.asFragment()).toMatchSnapshot();
});
