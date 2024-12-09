import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../test/Testprovider';
import { setupReactQueryMocks } from '../../../../test/testStore';
import VarselContainer from './VarslerContainer';

test('Viser varselcontainer med alt innhold', () => {
    setupReactQueryMocks();
    const container = renderer.create(
        <TestProvider>
            <VarselContainer />
        </TestProvider>
    );

    const json = container.toJSON();
    expect(json).toMatchSnapshot();
});
