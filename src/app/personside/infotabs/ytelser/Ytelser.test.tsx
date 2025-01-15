import { render } from '@testing-library/react';
import TestProvider from '../../../../test/Testprovider';
import { setupReactQueryMocks } from '../../../../test/testStore';
import Ytelser from './Ytelser';

test('Om Ytelser matcher snapshot', () => {
    setupReactQueryMocks();
    const resultat = render(
        <TestProvider>
            <Ytelser />
        </TestProvider>
    );

    expect(resultat.asFragment()).toMatchSnapshot();
    resultat.unmount();
});
