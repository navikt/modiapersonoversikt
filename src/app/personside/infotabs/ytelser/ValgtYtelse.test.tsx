import { act } from '@testing-library/react';
import { statiskForeldrepengeMock } from '../../../../mock/ytelse/statiskForeldrepengeMock';
import { statiskSykepengerMock } from '../../../../mock/ytelse/statiskSykepengerMock';
import { renderWithProviders } from '../../../../test/Testprovider';
import { setupReactQueryMocks } from '../../../../test/testStore';
import ValgtYtelse from './ValgtYtelse';
import { pleiepengerTestData } from './pleiepenger/pleiepengerTestData';

test('Om foreldrepenger matcher snapshot', async () => {
    setupReactQueryMocks();
    const resultat = await act(() => renderWithProviders(<ValgtYtelse valgtYtelse={statiskForeldrepengeMock} />));

    expect(resultat.asFragment()).toMatchSnapshot();
});

test('Om pleiepenger matcher snapshot', async () => {
    setupReactQueryMocks();
    const resultat = await act(() => renderWithProviders(<ValgtYtelse valgtYtelse={pleiepengerTestData} />));

    expect(resultat.asFragment()).toMatchSnapshot();
});

test('Om sykepenger matcher snapshot', async () => {
    setupReactQueryMocks();
    const resultat = await act(() => renderWithProviders(<ValgtYtelse valgtYtelse={statiskSykepengerMock} />));

    expect(resultat.asFragment()).toMatchSnapshot();
});
