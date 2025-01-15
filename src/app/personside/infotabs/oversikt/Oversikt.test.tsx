import { render } from '@testing-library/react';
import TestProvider from '../../../../test/Testprovider';
import { setupReactQueryMocks } from '../../../../test/testStore';
import Oversikt from './Oversikt';

test('Viser oversikt med alt innhold', () => {
    setupReactQueryMocks();
    const container = render(
        <TestProvider>
            <Oversikt />
        </TestProvider>
    );

    const json = container.asFragment();
    expect(json).toMatchSnapshot();
    container.unmount();
});
