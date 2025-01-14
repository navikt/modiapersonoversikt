import { render } from '@testing-library/react';
import TestProvider from '../../../../test/Testprovider';
import { setupReactQueryMocks } from '../../../../test/testStore';
import SaksoversiktContainerV2 from './SaksoversiktContainerV2';

test('Viser saksoversiktcontainer med alt innhold', () => {
    setupReactQueryMocks();
    const container = render(
        <TestProvider>
            <SaksoversiktContainerV2 />
        </TestProvider>
    );

    const json = container.asFragment();
    expect(json).toMatchSnapshot();
});
