import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../../test/Testprovider';
import { aremark } from '../../../../../mock/persondata/aremark';
import Sikkerhetstiltak from './Sikkerhetstiltak';

test('viser sikkerhetstiltak', () => {
    const visittkortbody = renderer.create(
        <TestProvider>
            <Sikkerhetstiltak sikkerhetstiltak={aremark.sikkerhetstiltak} />
        </TestProvider>
    );

    expect(visittkortbody.toJSON()).toMatchSnapshot();
});
