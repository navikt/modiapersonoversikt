import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../../test/Testprovider';
import { aremark } from '../../../../../mock/person/aremark';
import DeltBosted from './DeltBosted';

test('viser deltbosted', () => {
    const visittkortbody = renderer.create(
        <TestProvider>
            <DeltBosted deltbosted={aremark.deltBosted} />
        </TestProvider>
    );

    expect(visittkortbody.toJSON()).toMatchSnapshot();
});
