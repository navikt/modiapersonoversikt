import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../test/Testprovider';
import SendNyMeldingContainer from './SendNyMeldingContainer';
import { OppgavelisteValg } from './SendNyMelding';
import { setupReactQueryMocks } from '../../../../test/testStore';

beforeEach(() => {
    Date.prototype.getTime = jest.fn(() => 0);
    Date.parse = jest.fn(() => 0);
});

test('viser send ny melding', () => {
    setupReactQueryMocks();
    const dialogPanelBody = renderer.create(
        <TestProvider>
            <SendNyMeldingContainer defaultOppgaveDestinasjon={OppgavelisteValg.MinListe} />
        </TestProvider>
    );

    expect(dialogPanelBody.toJSON()).toMatchSnapshot();
});
