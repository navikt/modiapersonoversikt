import { act } from '@testing-library/react';
import { renderWithProviders } from 'src/test/Testprovider';
import { setupReactQueryMocks } from 'src/test/testStore';
import OppfolgingContainer from './OppfolgingContainer';

test('Viser oppfølgingcontainer med alt innhold', async () => {
    setupReactQueryMocks();
    const container = await act(() => renderWithProviders(<OppfolgingContainer />));
    expect(container.asFragment()).toMatchSnapshot();
    container.unmount();
});
