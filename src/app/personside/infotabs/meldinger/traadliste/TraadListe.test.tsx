import { act } from '@testing-library/react';
import { statiskTraadMock } from '../../../../../mock/meldinger/statiskTraadMock';
import { renderWithProviders } from '../../../../../test/Testprovider';
import { setupReactQueryMocks } from '../../../../../test/testStore';
import TraadListe from './TraadListe';

test('Viser Traadliste', async () => {
    setupReactQueryMocks();
    const traader = [statiskTraadMock];

    const container = await act(() =>
        renderWithProviders(
            <TraadListe traader={traader} valgtTraad={traader[0]} traaderEtterSokOgFiltrering={traader} />
        )
    );

    const json = container.asFragment();
    expect(json).toMatchSnapshot();
});
