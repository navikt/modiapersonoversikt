import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../test/Testprovider';
import { setupReactQueryMocks } from '../../../../test/testStore';
import SaksoversiktContainerV2 from './SaksoversiktContainerV2';

test('Viser saksoversiktcontainer med alt innhold', () => {
    setupReactQueryMocks();
    const container = renderer.create(
        <TestProvider>
            <SaksoversiktContainerV2 />
        </TestProvider>
    );

    const json = container.toJSON();
    expect(json).toMatchSnapshot();
});
