import { render } from '@testing-library/react';
import { statiskTraadMock } from '../../../../../../../mock/meldinger/statiskTraadMock';
import TestProvider from '../../../../../../../test/Testprovider';
import { setupReactQueryMocks } from '../../../../../../../test/testStore';
import OpprettOppgaveContainer from './OpprettOppgaveContainer';

test('Viser oppgavecontainer med alt innhold', () => {
    setupReactQueryMocks();
    const container = render(
        <TestProvider>
            <OpprettOppgaveContainer lukkPanel={() => {}} valgtTraad={statiskTraadMock} />
        </TestProvider>
    );

    const json = container.asFragment();
    expect(json).toMatchSnapshot();
});
