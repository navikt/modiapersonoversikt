import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../../test/Testprovider';
import DeltBosted from './DeltBosted';
import { aremark } from '../../../../../mock/persondata/aremark';

test('viser deltbosted', () => {
    const visittkortbody = renderer.create(
        <TestProvider>
            <DeltBosted deltBosted={aremark.deltBosted} />
        </TestProvider>
    );

    expect(visittkortbody.toJSON()).toMatchSnapshot();
});
