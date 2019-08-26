import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../test/Testprovider';
import SendNyMeldingContainer from './SendNyMeldingContainer';

beforeEach(() => {
    Date.prototype.getTime = jest.fn(() => 0);
    Date.parse = jest.fn(() => 0);
});

test('viser send ny melding', () => {
    const dialogPanelBody = renderer.create(
        <TestProvider>
            <SendNyMeldingContainer />
        </TestProvider>
    );

    expect(dialogPanelBody.toJSON()).toMatchSnapshot();
});
