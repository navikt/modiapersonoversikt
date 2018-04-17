import * as React from 'react';
import Visittkort from './Visittkort';
import { mount } from 'enzyme';
import VisittkortHeader from './header/VisittkortHeader';
import VisittkortBody from './body/VisittkortBody';
import { Provider } from 'react-redux';
import { testStore } from '../../../setupTests';
import { personinformasjonActionNames } from '../../../redux/personinformasjon';
import { aremark } from '../../../mock/person/aremark';

test('viser visittkortheader når visittkort først rendres', () => {
    const visittkort = mount(<Provider store={testStore}><Visittkort person={aremark} /></Provider>);

    testStore.dispatch({type: personinformasjonActionNames.OK, data: aremark});

    expect(visittkort).toContainReact(<VisittkortHeader person={aremark} />);
    expect(visittkort).not.toContainReact(<VisittkortBody person={aremark} />);
});

test('viser visittkortheader og visitkortbody når visittkort åpnes med museklikk', () => {
    const visittkort = mount(<Provider store={testStore}><Visittkort person={aremark} /></Provider>);

    testStore.dispatch({type: personinformasjonActionNames.OK, data: aremark});
    visittkort.find('button.ekspanderbartPanel__hode').simulate('click');

    expect(visittkort).toContainReact(<VisittkortHeader person={aremark} />);
    expect(visittkort).toContainReact(<VisittkortBody person={aremark} />);
});
