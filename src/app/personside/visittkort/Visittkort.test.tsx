import * as React from 'react';
import Visittkort from './Visittkort';
import { aremark } from '../../../mock/person-mock';
import { mount } from 'enzyme';
import VisittkortHeader from './header/VisittkortHeader';
import VisittkortBody from './body/VisittkortBody';
import { Provider } from 'react-redux';
import { testStore } from '../../../setupTests';
import { personinformasjonActionNames } from '../../../redux/personinformasjon';
import { ThemeProvider } from 'styled-components';
import { personOversiktTheme } from '../../../themes/personOversiktTheme';

const visittkort = mount((
    <ThemeProvider theme={personOversiktTheme}>
        <Provider store={testStore}>
            <Visittkort person={aremark}/>
        </Provider>
    </ThemeProvider>
));

testStore.dispatch({ type: personinformasjonActionNames.OK, data: aremark });

test('viser visittkortheader når visittkort først rendres', () => {
    expect(visittkort).toContainReact(<VisittkortHeader person={aremark}/>);
    expect(visittkort).not.toContainReact(<VisittkortBody person={aremark}/>);
});

test('viser visittkortheader og visitkortbody når visittkort åpnes med museklikk', () => {
    visittkort.find('button.ekspanderbartPanel__hode').simulate('click');

    expect(visittkort).toContainReact(<VisittkortHeader person={aremark}/>);
    expect(visittkort).toContainReact(<VisittkortBody person={aremark}/>);
});
