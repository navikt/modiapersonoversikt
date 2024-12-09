import * as renderer from 'react-test-renderer';
import { aremark } from '../../../../../mock/persondata/aremark';
import TestProvider from '../../../../../test/Testprovider';
import Vergemal from './Vergemal';

test('viser vergemål', () => {
    const visittkortbody = renderer.create(
        <TestProvider>
            <Vergemal feilendeSystemer={[]} vergemal={aremark.vergemal} />
        </TestProvider>
    );

    expect(visittkortbody.toJSON()).toMatchSnapshot();
});
