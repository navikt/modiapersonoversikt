import '../../../../src/testSetup';
import * as React from 'react';
import Visittkort from './Visittkort';
import { aremark } from '../../../mock/person-mock';
import { mount } from 'enzyme';
import VisittkortHeader from './header/VisittkortHeader';
import VisittkortBody from './body/VisittkortBody';

test('viser visittkortheader når visittkort først rendres', () => {
    const visittkort = mount(<Visittkort person={aremark} />);

    expect(visittkort).toContainReact(<VisittkortHeader person={aremark} />);
    expect(visittkort).not.toContainReact(<VisittkortBody person={aremark} />);
});

test('viser visittkortheader og visitkortbody når visittkort åpnes med museklikk', () => {
    const visittkort = mount(<Visittkort person={aremark} />);

    visittkort.find('button.ekspanderbartPanel__hode').simulate('click');

    expect(visittkort).toContainReact(<VisittkortHeader person={aremark} />);
    expect(visittkort).toContainReact(<VisittkortBody person={aremark} />);
});
