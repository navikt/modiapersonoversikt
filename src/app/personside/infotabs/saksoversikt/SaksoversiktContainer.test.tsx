import { act } from '@testing-library/react';
import { renderWithProviders } from '../../../../test/Testprovider';
import { setupReactQueryMocks } from '../../../../test/testStore';
import SaksoversiktContainerV2 from './SaksoversiktContainerV2';

test('Viser saksoversiktcontainer med alt innhold', async () => {
    setupReactQueryMocks();
    const container = await act(() => renderWithProviders(<SaksoversiktContainerV2 />));

    const json = container.asFragment();
    expect(json).toMatchSnapshot();
});
