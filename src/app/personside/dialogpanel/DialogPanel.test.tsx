import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../test/Testprovider';
import DialogPanel from './DialogPanel';
import { setupReactQueryMocks } from '../../../test/testStore';

beforeEach(() => {
    Date.prototype.getTime = jest.fn(() => 0);
    Date.parse = jest.fn(() => 0);
});

test('viser dialogpanel', () => {
    setupReactQueryMocks();
    const dialogPanelBody = renderer.create(
        <TestProvider>
            <DialogPanel />
        </TestProvider>
    );

    expect(dialogPanelBody.toJSON()).toMatchSnapshot();
});
