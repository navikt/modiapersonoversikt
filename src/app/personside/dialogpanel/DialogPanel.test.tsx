import { act, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { statiskTraadMock } from '../../../mock/meldinger/statiskTraadMock';
import { aremark } from '../../../mock/persondata/aremark';
import tildelteoppgaverResource from '../../../rest/resources/tildelteoppgaverResource';
import { renderWithProviders } from '../../../test/Testprovider';
import { mockReactQuery, setupReactQueryMocks } from '../../../test/testStore';
import DialogPanel from './DialogPanel';

beforeEach(() => {
    Date.prototype.getTime = vi.fn(() => 0);
    Date.parse = vi.fn(() => 0);

    setupReactQueryMocks();
    vi.spyOn(tildelteoppgaverResource, 'useFetch');
    mockReactQuery(
        tildelteoppgaverResource.useFetch,
        [
            {
                oppgaveId: 'aremark-oppgave',
                fnr: aremark.personIdent,
                erSTOOppgave: false,
                traadId: statiskTraadMock.traadId
            }
        ],
        { refetch: vi.fn() }
    );
});

test('viser dialogpanel', async () => {
    const dialogPanelBody = await act(() => renderWithProviders(<DialogPanel />));

    await screen.findByText('Fortsett chat');
    expect(dialogPanelBody.asFragment()).toMatchSnapshot();
    dialogPanelBody.unmount();
});
