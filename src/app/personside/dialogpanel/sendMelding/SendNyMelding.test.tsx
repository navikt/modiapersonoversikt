import { render } from '@testing-library/react';
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
    const dialogPanelBody = render(
        <TestProvider>
            <SendNyMeldingContainer defaultOppgaveDestinasjon={OppgavelisteValg.MinListe} />
        </TestProvider>
    );

    expect(dialogPanelBody.asFragment()).toMatchSnapshot();
    dialogPanelBody.unmount();
});
