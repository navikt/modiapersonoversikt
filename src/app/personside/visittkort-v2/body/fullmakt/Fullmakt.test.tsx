import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../../test/Testprovider';
import { aremark } from './../../../../../mock/persondata/aremark';
import Fullmakter from './Fullmakt';

test('viser fullmakt', () => {
    const visittkortbody = renderer.create(
        <TestProvider>
            <Fullmakter feilendeSystemer={[]} fullmakter={aremark.fullmakt} />
        </TestProvider>
    );

    expect(visittkortbody.toJSON()).toMatchSnapshot();
});
