import * as React from 'react';
import * as renderer from 'react-test-renderer';
import VisittkortBody from './VisittkortBody';
import TestProvider from '../../../../test/Testprovider';
import { aremark } from '../../../../mock/persondata/aremark';
import { InformasjonElement } from '../PersondataDomain';

test('viser info om bruker i visittkortbody', () => {
    const visittkortbody = renderer.create(
        <TestProvider>
            <VisittkortBody
                persondata={{
                    feilendeSystemer: [InformasjonElement.EGEN_ANSATT],
                    person: aremark
                }}
            />
        </TestProvider>
    );

    expect(visittkortbody.toJSON()).toMatchSnapshot();
});
