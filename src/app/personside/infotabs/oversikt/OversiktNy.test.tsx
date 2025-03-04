import { render } from '@testing-library/react';
import OversiktNy from 'src/app/personside/infotabs/oversikt/OversiktNy';
import { setupReactQueryMocks } from 'src/test/testStore';
import TestProvider from '../../../../test/Testprovider';

test('Viser ny oversikt med alt innhold', () => {
    setupReactQueryMocks();
    const container = render(
        <TestProvider>
            <OversiktNy />
        </TestProvider>
    );

    const json = container.asFragment();
    expect(json).toMatchSnapshot();
    container.unmount();
});
