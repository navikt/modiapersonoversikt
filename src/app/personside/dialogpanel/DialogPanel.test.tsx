import { act } from '@testing-library/react';
import { vi } from 'vitest';
import { renderWithProviders } from '../../../test/Testprovider';
import { setupReactQueryMocks } from '../../../test/testStore';
import DialogPanel from './DialogPanel';

beforeEach(() => {
    Date.prototype.getTime = vi.fn(() => 0);
    Date.parse = vi.fn(() => 0);

    setupReactQueryMocks();
});

test('viser dialogpanel', async () => {
    const dialogPanelBody = await act(() => renderWithProviders(<DialogPanel />));

    expect(dialogPanelBody.asFragment()).toMatchSnapshot();
    dialogPanelBody.unmount();
});
