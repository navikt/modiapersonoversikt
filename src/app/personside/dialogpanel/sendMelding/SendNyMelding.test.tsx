import * as renderer from 'react-test-renderer';
import { vi } from 'vitest';
import TestProvider from '../../../../test/Testprovider';
import { setupReactQueryMocks } from '../../../../test/testStore';
import { OppgavelisteValg } from './SendNyMelding';
import SendNyMeldingContainer from './SendNyMeldingContainer';

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
    dialogPanelBody.unmount();
});
