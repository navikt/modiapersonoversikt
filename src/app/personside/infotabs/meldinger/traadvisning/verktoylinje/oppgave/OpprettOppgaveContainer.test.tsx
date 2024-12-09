import * as renderer from 'react-test-renderer';
import { statiskTraadMock } from '../../../../../../../mock/meldinger/statiskTraadMock';
import TestProvider from '../../../../../../../test/Testprovider';
import { setupReactQueryMocks } from '../../../../../../../test/testStore';
import OpprettOppgaveContainer from './OpprettOppgaveContainer';

test('Viser oppgavecontainer med alt innhold', () => {
    setupReactQueryMocks();
    const container = renderer.create(
        <TestProvider>
            <OpprettOppgaveContainer lukkPanel={() => {}} valgtTraad={statiskTraadMock} />
        </TestProvider>
    );

    const json = container.toJSON();
    expect(json).toMatchSnapshot();
});
