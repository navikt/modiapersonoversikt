import * as React from 'react';
import Visittkort from './VisittkortContainer';
import { mount } from 'enzyme';
import VisittkortHeader from './header/VisittkortHeader';
import VisittkortBody from './body/VisittkortBody';
import { aremark } from '../../../mock/person/aremark';
import TestProvider from '../../../test/Testprovider';

const visittkort = mount((
    <TestProvider>
            <Visittkort/>
    </TestProvider>
));

test('viser visittkortheader når visittkort først rendres', () => {
    expect(visittkort).toContainReact(<VisittkortHeader person={aremark}/>);
    expect(visittkort).not.toContainReact(<VisittkortBody person={aremark}/>);
});

test('viser visittkortheader og visitkortbody når visittkort åpnes med museklikk', () => {
    visittkort.find('button.ekspanderbartPanel__hode').simulate('click');

    expect(visittkort).toContainReact(<VisittkortHeader person={aremark}/>);
    expect(visittkort).toContainReact(<VisittkortBody person={aremark}/>);
});
