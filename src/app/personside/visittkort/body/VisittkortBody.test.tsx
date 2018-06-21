import * as React from 'react';
import VisittkortBody from './VisittkortBody';
import { aremark } from '../../../../mock/person/aremark';
import TestProvider from '../../../../test/Testprovider';
import { mount } from 'enzyme';

test('viser info om bruker i visittkortbody', () => {

    const visittkortbody = mount(
        <TestProvider>
            <VisittkortBody person={aremark}/>
        </TestProvider>
    );

    expect(visittkortbody).toExist();
});
