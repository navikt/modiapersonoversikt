import { act, screen } from '@testing-library/react';
import { statiskTraadMock } from '../../../../../../../mock/meldinger/statiskTraadMock';
import { renderWithProviders } from '../../../../../../../test/Testprovider';
import { setupReactQueryMocks } from '../../../../../../../test/testStore';
import OpprettOppgaveContainer from './OpprettOppgaveContainer';

test('Viser oppgavecontainer med alt innhold', async () => {
    setupReactQueryMocks();
    const container = await act(() =>
        renderWithProviders(<OpprettOppgaveContainer lukkPanel={() => {}} valgtTraad={statiskTraadMock} />)
    );

    await Promise.all([
        screen.findByText('Avslutt aktiv oppgave fra GOSYS'),
        screen.findByText('Sett til min oppgaveliste')
    ]);

    const json = container.asFragment();
    expect(json).toMatchSnapshot();
});
