import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../test/Testprovider';
import FortsettDialog from './FortsettDialog';

test('viser fortsett dialog', () => {
    const dialogPanelBody = renderer.create(
        <TestProvider>
            <FortsettDialog />
        </TestProvider>
    );

    expect(dialogPanelBody.toJSON()).toMatchSnapshot();
});
