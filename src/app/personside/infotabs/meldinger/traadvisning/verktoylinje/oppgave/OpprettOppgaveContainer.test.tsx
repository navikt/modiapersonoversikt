import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../../../../test/Testprovider';
import OpprettOppgaveContainer from './OpprettOppgaveContainer';
import { statiskTraadMock } from '../../../../../../../mock/meldinger/statiskTraadMock';
import { setupReactQueryMocks } from '../../../../../../../test/testStore';

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
