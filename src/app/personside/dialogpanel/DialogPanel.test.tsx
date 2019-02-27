import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../test/Testprovider';
import DialogPanel from './DialogPanel';

test('viser dialogpanel', () => {
    const dialogPanelBody = renderer.create(
        <TestProvider>
            <DialogPanel />
        </TestProvider>
    );

    expect(dialogPanelBody.toJSON()).toMatchSnapshot();
});
