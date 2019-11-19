import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../../test/Testprovider';
import { aremark } from '../../../../../mock/person/aremark';
import Fullmakter from './Fullmakt';

test('viser fullmakt', () => {
    const visittkortbody = renderer.create(
        <TestProvider>
            <Fullmakter fullmakter={aremark.fullmakt} />
        </TestProvider>
    );

    expect(visittkortbody.toJSON()).toMatchSnapshot();
});
