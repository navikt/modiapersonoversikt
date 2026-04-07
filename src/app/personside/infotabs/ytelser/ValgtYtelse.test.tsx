import { act } from '@testing-library/react';
import { statiskSykepengerMock } from '../../../../mock/ytelse/statiskSykepengerMock';
import { renderWithProviders } from '../../../../test/Testprovider';
import { setupReactQueryMocks } from '../../../../test/testStore';
import ValgtYtelse from './ValgtYtelse';

test('Om sykepenger matcher snapshot', async () => {
    setupReactQueryMocks();
    const resultat = await act(() => renderWithProviders(<ValgtYtelse valgtYtelse={statiskSykepengerMock} />));

    expect(resultat.asFragment()).toMatchSnapshot();
});
