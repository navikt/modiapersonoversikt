import { act, screen } from '@testing-library/react';
import { statiskTraadMock } from '../../../../../mock/meldinger/statiskTraadMock';
import { renderWithProviders } from '../../../../../test/Testprovider';
import { setupReactQueryMocks } from '../../../../../test/testStore';
import TraadVisningWrapper from './TraadVisningWrapper';

test('Viser traad med verktøylinje', async () => {
    setupReactQueryMocks();
    const traader = [statiskTraadMock];

    const container = await act(() =>
        renderWithProviders(<TraadVisningWrapper valgtTraad={traader[0]} sokeord={''} />)
    );

    await Promise.all([
        screen.findByRole('heading', { name: 'Velg sak' }),
        screen.findByText('Avslutt aktiv oppgave fra GOSYS'),
        screen.findByText('Sett til min oppgaveliste')
    ]);

    const json = container.asFragment();
    expect(json).toMatchSnapshot();
});
