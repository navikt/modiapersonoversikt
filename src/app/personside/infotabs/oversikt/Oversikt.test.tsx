import { act } from '@testing-library/react';
import { vi } from 'vitest';
import tildelteoppgaverResource from '../../../../rest/resources/tildelteoppgaverResource';
import { renderWithProviders } from '../../../../test/Testprovider';
import { mockReactQuery, setupReactQueryMocks } from '../../../../test/testStore';
import Oversikt from './Oversikt';

test('Viser oversikt med alt innhold', async () => {
    setupReactQueryMocks();
    vi.spyOn(tildelteoppgaverResource, 'useFetch');
    mockReactQuery(tildelteoppgaverResource.useFetch, []);
    const container = await act(() => renderWithProviders(<Oversikt />));

    const json = container.asFragment();
    expect(json).toMatchSnapshot();
    container.unmount();
});
