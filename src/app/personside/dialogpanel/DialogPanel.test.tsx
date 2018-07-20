import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../test/Testprovider';
import DialogPanel from './DialogPanel';
import { DialogPanelSize } from '../MainLayout';

test('viser dialogpanel', () => {

    const dialogPanelBody = renderer.create(
        <TestProvider>
            <DialogPanel onToggleDialogpanel={() => null} dialogPanelSize={DialogPanelSize.Stor}/>
        </TestProvider>
    );

    expect(dialogPanelBody.toJSON()).toMatchSnapshot();
});
