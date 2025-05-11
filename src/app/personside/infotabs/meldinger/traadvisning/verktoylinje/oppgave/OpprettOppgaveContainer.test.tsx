import { act } from '@testing-library/react';
import { statiskTraadMock } from '../../../../../../../mock/meldinger/statiskTraadMock';
import { renderWithProviders } from '../../../../../../../test/Testprovider';
import { setupReactQueryMocks } from '../../../../../../../test/testStore';
import OpprettOppgaveContainer from './OpprettOppgaveContainer';

test('Viser oppgavecontainer med alt innhold', async () => {
    setupReactQueryMocks();
    const container = await act(() =>
        renderWithProviders(<OpprettOppgaveContainer lukkPanel={() => {}} valgtTraad={statiskTraadMock} />)
    );

    const json = container.asFragment();
    expect(json).toMatchSnapshot();
});
