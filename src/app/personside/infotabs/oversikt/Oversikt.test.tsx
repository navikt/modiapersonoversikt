import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../test/Testprovider';
import { setupReactQueryMocks } from '../../../../test/testStore';
import Oversikt from './Oversikt';

test('Viser oversikt med alt innhold', () => {
    setupReactQueryMocks();
    const container = renderer.create(
        <TestProvider>
            <Oversikt />
        </TestProvider>
    );

    const json = container.toJSON();
    expect(json).toMatchSnapshot();
    container.unmount();
});
