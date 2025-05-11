import { act } from '@testing-library/react';
import { statiskForeldrepengeMock } from 'src/mock/ytelse/statiskForeldrepengeMock';
import { renderWithProviders } from '../../../../../test/Testprovider';
import Foreldrepenger from './ForeldrePenger';

test('Foreldrepengeperiode matcher snapshot', async () => {
    const testRettighet = statiskForeldrepengeMock;
    const result = await act(() => renderWithProviders(<Foreldrepenger foreldrepenger={testRettighet} />));

    expect(result.asFragment()).toMatchSnapshot();
});
