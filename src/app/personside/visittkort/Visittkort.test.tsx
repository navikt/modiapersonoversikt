import * as React from 'react';
import Visittkort from './VisittkortContainer';
import { mount } from 'enzyme';
import VisittkortHeader from './header/VisittkortHeader';
import VisittkortBody from './body/VisittkortBody';
import { Provider } from 'react-redux';
import { testStore } from '../../../test/setupTests';
import { personinformasjonActionNames } from '../../../redux/restReducers/personinformasjon';
import { aremark } from '../../../mock/person/aremark';
import { StaticRouter } from 'react-router';

testStore.dispatch({type: personinformasjonActionNames.FINISHED, data: aremark});

const visittkort = mount((
    <Provider store={testStore}>
        <StaticRouter context={{}}>
            <Visittkort/>
        </StaticRouter>
    </Provider>
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
