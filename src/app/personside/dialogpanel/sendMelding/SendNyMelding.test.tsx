import * as React from 'react';
import * as renderer from 'react-test-renderer';
import SendNyMelding from './SendNyMelding';
import TestProvider from '../../../../test/Testprovider';

test('viser send ny melding', () => {
    const dialogPanelBody = renderer.create(
        <TestProvider>
            <SendNyMelding />
        </TestProvider>
    );

    expect(dialogPanelBody.toJSON()).toMatchSnapshot();
});
