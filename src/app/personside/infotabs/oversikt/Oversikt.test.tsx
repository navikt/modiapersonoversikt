import { act } from '@testing-library/react';
import { renderWithProviders } from '../../../../test/Testprovider';
import { setupReactQueryMocks } from '../../../../test/testStore';
import Oversikt from './Oversikt';

test('Viser oversikt med alt innhold', async () => {
    setupReactQueryMocks();
    const container = await act(() => renderWithProviders(<Oversikt />));

    const json = container.asFragment();
    expect(json).toMatchSnapshot();
    container.unmount();
});
