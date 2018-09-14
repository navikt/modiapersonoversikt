import * as React from 'react';
import Visittkort from './VisittkortContainer';
import { mount } from 'enzyme';
import TestProvider from '../../../test/Testprovider';

const visittkort = mount((
    <TestProvider>
            <Visittkort/>
    </TestProvider>
));

test('viser visittkortheader når visittkort først rendres', () => {
    expect(visittkort.find('section [aria-label="Visittkort-hode"]')).toHaveLength(1);
    expect(visittkort.find('section [aria-label="Visittkortdetaljer"]')).toHaveLength(0);
});

test('viser visittkortheader og visitkortbody når visittkort åpnes med museklikk', () => {
    visittkort.find('button').simulate('click');

    expect(visittkort.find('section [aria-label="Visittkort-hode"]')).toHaveLength(1);
    expect(visittkort.find('section [aria-label="Visittkortdetaljer"]')).toHaveLength(1);
});
