import { act } from '@testing-library/react';
import { vi } from 'vitest';
import { renderWithProviders } from '../../../../test/Testprovider';
import { setupReactQueryMocks } from '../../../../test/testStore';
import { OppgavelisteValg } from './SendNyMelding';
import SendNyMeldingContainer from './SendNyMeldingContainer';

beforeEach(() => {
    Date.prototype.getTime = vi.fn(() => 0);
    Date.parse = vi.fn(() => 0);

    setupReactQueryMocks();
});

test('viser send ny melding', async () => {
    const dialogPanelBody = await act(() =>
        renderWithProviders(<SendNyMeldingContainer defaultOppgaveDestinasjon={OppgavelisteValg.MinListe} />)
    );

    expect(dialogPanelBody.asFragment()).toMatchSnapshot();
    dialogPanelBody.unmount();
});
