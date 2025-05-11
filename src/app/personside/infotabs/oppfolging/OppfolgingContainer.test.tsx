import { render } from '@testing-library/react';
import { TestStoreWithoutRouter } from '../../../../test/Testprovider';
import { setupReactQueryMocks } from '../../../../test/testStore';
import OppfolgingContainer from './OppfolgingContainer';

test('Viser oppfølgingcontainer med alt innhold', async () => {
    setupReactQueryMocks();
    const container = render(
        <TestStoreWithoutRouter>
            <OppfolgingContainer />
        </TestStoreWithoutRouter>
    );

    const json = container.asFragment();
    expect(json).toMatchSnapshot();
});
