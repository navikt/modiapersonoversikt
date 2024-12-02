import * as renderer from 'react-test-renderer';
import TestProvider from '../../../test/Testprovider';
import DialogPanel from './DialogPanel';
import { setupReactQueryMocks } from '../../../test/testStore';
import { vi } from 'vitest';

beforeEach(() => {
    Date.prototype.getTime = vi.fn(() => 0);
    Date.parse = vi.fn(() => 0);

    setupReactQueryMocks();
});

test('viser dialogpanel', () => {
    const dialogPanelBody = renderer.create(
        <TestProvider>
            <DialogPanel />
        </TestProvider>
    );

    expect(dialogPanelBody.toJSON()).toMatchSnapshot();
    dialogPanelBody.unmount();
});
