import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../../test/Testprovider';
import DeltBosted from './DeltBosted';
import { aremark } from '../../../../../mock/personPdl/aremark';
import * as React from 'react';

test('viser deltbosted', () => {
    const visittkortbody = renderer.create(
        <TestProvider>
            <DeltBosted deltbosted={aremark.deltBosted} />
        </TestProvider>
    );

    expect(visittkortbody.toJSON()).toMatchSnapshot();
});
