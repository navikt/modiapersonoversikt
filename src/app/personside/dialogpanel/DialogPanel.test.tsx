import { render } from '@testing-library/react';
import { vi } from 'vitest';
import TestProvider from '../../../test/Testprovider';
import { setupReactQueryMocks } from '../../../test/testStore';
import DialogPanel from './DialogPanel';

beforeEach(() => {
    Date.prototype.getTime = vi.fn(() => 0);
    Date.parse = vi.fn(() => 0);

    setupReactQueryMocks();
});

test('viser dialogpanel', () => {
    const dialogPanelBody = render(
        <TestProvider>
            <DialogPanel />
        </TestProvider>
    );

    expect(dialogPanelBody.asFragment()).toMatchSnapshot();
    dialogPanelBody.unmount();
});
