import { act } from '@testing-library/react';
import { renderWithProviders } from '../../../../test/Testprovider';
import { setupReactQueryMocks } from '../../../../test/testStore';
import Ytelser from './Ytelser';

test('Om Ytelser matcher snapshot', async () => {
    setupReactQueryMocks();
    const resultat = await act(() => renderWithProviders(<Ytelser />));

    expect(resultat.asFragment()).toMatchSnapshot();
    resultat.unmount();
});
