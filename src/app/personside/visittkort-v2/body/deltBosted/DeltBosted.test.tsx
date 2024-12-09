import * as renderer from 'react-test-renderer';
import { aremark } from '../../../../../mock/persondata/aremark';
import TestProvider from '../../../../../test/Testprovider';
import DeltBosted from './DeltBosted';

test('viser deltbosted', () => {
    const visittkortbody = renderer.create(
        <TestProvider>
            <DeltBosted deltBosted={aremark.deltBosted} />
        </TestProvider>
    );

    expect(visittkortbody.toJSON()).toMatchSnapshot();
});
