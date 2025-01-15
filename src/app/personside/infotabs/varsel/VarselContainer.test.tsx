import { render } from '@testing-library/react';
import TestProvider from '../../../../test/Testprovider';
import { setupReactQueryMocks } from '../../../../test/testStore';
import VarselContainer from './VarslerContainer';

test('Viser varselcontainer med alt innhold', () => {
    setupReactQueryMocks();
    const container = render(
        <TestProvider>
            <VarselContainer />
        </TestProvider>
    );

    const json = container.asFragment();
    expect(json).toMatchSnapshot();
});
