import * as renderer from 'react-test-renderer';
import { aremark } from '../../../../../mock/persondata/aremark';
import TestProvider from '../../../../../test/Testprovider';
import Sikkerhetstiltak from './Sikkerhetstiltak';

test('viser sikkerhetstiltak', () => {
    const visittkortbody = renderer.create(
        <TestProvider>
            <Sikkerhetstiltak sikkerhetstiltak={aremark.sikkerhetstiltak} />
        </TestProvider>
    );

    expect(visittkortbody.toJSON()).toMatchSnapshot();
});
