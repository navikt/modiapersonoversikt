import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../test/Testprovider';
import { setupReactQueryMocks } from '../../../../test/testStore';
import Ytelser from './Ytelser';

test('Om Ytelser matcher snapshot', () => {
    setupReactQueryMocks();
    const resultat = renderer.create(
        <TestProvider>
            <Ytelser />
        </TestProvider>
    );

    expect(resultat.toJSON()).toMatchSnapshot();
    resultat.unmount();
});
