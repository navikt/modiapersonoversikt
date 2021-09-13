import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../../test/Testprovider';
import { aremark } from '../../../../../mock/personPdl/aremark';
import Fullmakter from './Fullmakt';

test('viser fullmakt', () => {
    const visittkortbody = renderer.create(
        <TestProvider>
            <Fullmakter fullmakter={aremark.fullmakt} />
        </TestProvider>
    );

    expect(visittkortbody.toJSON()).toMatchSnapshot();
});
