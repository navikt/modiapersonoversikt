import * as renderer from 'react-test-renderer';
import { statiskForeldrepengeMock } from '../../../../../mock/ytelse/statiskForeldrepengeMock';
import TestProvider from '../../../../../test/Testprovider';
import Foreldrepenger from './ForeldrePenger';

test('Foreldrepengeperiode matcher snapshot', () => {
    const testRettighet = statiskForeldrepengeMock;
    const result = renderer.create(
        <TestProvider>
            <Foreldrepenger foreldrepenger={testRettighet} />
        </TestProvider>
    );

    expect(result).toMatchSnapshot();
});
