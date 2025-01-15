import { render } from '@testing-library/react';
import TestProvider from '../../../../test/Testprovider';
import { setupReactQueryMocks } from '../../../../test/testStore';
import OppfolgingContainer from './OppfolgingContainer';

test('Viser oppfølgingcontainer med alt innhold', () => {
    setupReactQueryMocks();
    const container = render(
        <TestProvider>
            <OppfolgingContainer />
        </TestProvider>
    );

    const json = container.asFragment();
    expect(json).toMatchSnapshot();
});
