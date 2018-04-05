import '../../../../src/testSetup';
import * as React from 'react';
import Visittkort from './Visittkort';
import { aremark } from '../../../mock/person-mock';
import { mount } from 'enzyme';

test('viser visittkortheader når visittkort først rendres', () => {
    const visittkort = mount(<Visittkort person={aremark} />);

    expect(visittkort.find('VisittkortHeader').length).toEqual(1);
    expect(visittkort.find('VisittkortBody').length).toEqual(0);
});

test('viser visittkortheader og visitkortbody når visittkort åpnes med museklikk', () => {
    const visittkort = mount(<Visittkort person={aremark} />);

    visittkort.find('button.ekspanderbartPanel__hode').simulate('click');

    expect(visittkort.find('VisittkortHeader').length).toEqual(1);
    expect(visittkort.find('VisittkortBody').length).toEqual(1);
});
