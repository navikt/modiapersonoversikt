import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TestProvider from '../../../../../test/Testprovider';
import { aremark } from '../../../../../mock/persondata/aremark';
import Vergemal from './Vergemal';

test('viser vergemål', () => {
    const visittkortbody = renderer.create(
        <TestProvider>
            <Vergemal feilendeSystem={false} vergemal={aremark.vergemal} />
        </TestProvider>
    );

    expect(visittkortbody.toJSON()).toMatchSnapshot();
});
