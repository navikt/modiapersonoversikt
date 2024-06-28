import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../test/Testprovider';
import SendNyMeldingContainer from './SendNyMeldingContainer';
import { OppgavelisteValg } from './SendNyMelding';
import { setupReactQueryMocks } from '../../../../test/testStore';
import { vi } from 'vitest';

beforeEach(() => {
    Date.prototype.getTime = vi.fn(() => 0);
    Date.parse = vi.fn(() => 0);

    setupReactQueryMocks();
});

test('viser send ny melding', () => {
    const dialogPanelBody = renderer.create(
        <TestProvider>
            <SendNyMeldingContainer defaultOppgaveDestinasjon={OppgavelisteValg.MinListe} />
        </TestProvider>
    );

    expect(dialogPanelBody.toJSON()).toMatchSnapshot();
});
