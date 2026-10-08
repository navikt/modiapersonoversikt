import { act, screen } from '@testing-library/react';
import { beforeEach, vi } from 'vitest';
import { statiskTraadMock } from '../../../../../mock/meldinger/statiskTraadMock';
import { aremark } from '../../../../../mock/persondata/aremark';
import tildelteoppgaverResource from '../../../../../rest/resources/tildelteoppgaverResource';
import { renderWithProviders } from '../../../../../test/Testprovider';
import { mockReactQuery, setupReactQueryMocks } from '../../../../../test/testStore';
import TraadListe from './TraadListe';

beforeEach(() => {
    setupReactQueryMocks();
    vi.spyOn(tildelteoppgaverResource, 'useFetch');
    mockReactQuery(tildelteoppgaverResource.useFetch, []);
});

test('Viser Traadliste', async () => {
    const traader = [statiskTraadMock];

    const container = await act(() =>
        renderWithProviders(
            <TraadListe traader={traader} valgtTraad={traader[0]} traaderEtterSokOgFiltrering={traader} />
        )
    );

    const json = container.asFragment();
    expect(screen.queryByText('Tildelt meg')).not.toBeInTheDocument();
    expect(json).toMatchSnapshot();
});

test('viser Tildelt meg når tråden har en oppgave tildelt på gjeldende bruker', async () => {
    mockReactQuery(tildelteoppgaverResource.useFetch, [
        {
            oppgaveId: 'test-oppgave',
            fnr: aremark.personIdent,
            traadId: statiskTraadMock.traadId,
            erSTOOppgave: false
        }
    ]);
    const traader = [statiskTraadMock];

    await act(() =>
        renderWithProviders(
            <TraadListe traader={traader} valgtTraad={traader[0]} traaderEtterSokOgFiltrering={traader} />
        )
    );

    expect(screen.getByText('Tildelt meg')).toBeInTheDocument();
});
