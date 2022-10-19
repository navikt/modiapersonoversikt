import * as React from 'react';
import * as renderer from 'react-test-renderer';
import VisittkortBody from './VisittkortBody';
import TestProvider from '../../../../test/Testprovider';
import { aremark } from '../../../../mock/persondata/aremark';
import { setupReactQueryMocks } from '../../../../test/testStore';

test('viser info om bruker i visittkortbody', () => {
    setupReactQueryMocks();
    const visittkortbody = renderer.create(
        <TestProvider>
            <VisittkortBody
                persondata={{
                    feilendeSystemer: [],
                    person: aremark
                }}
            />
        </TestProvider>
    );

    expect(visittkortbody.toJSON()).toMatchSnapshot();
});
