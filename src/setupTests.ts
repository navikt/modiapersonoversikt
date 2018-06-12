import { configure } from 'enzyme';
import * as EnzymeReactAdapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import 'babel-polyfill';

configure({ adapter: new EnzymeReactAdapter() });

// tslint:disable-next-line
const globalAny: any = global;
globalAny._apiBaseUri = '';
globalAny._mockEnabled = 'true';

import reducers from './redux/reducer';
import { createStore } from 'redux';
import { getMockNavKontor } from './mock/navkontor-mock';
import { actionNames as navKontorActionNames } from './redux/navkontor';
import { mockVergemal } from './mock/vergemal-mocks';
import { kontaktinformasjonActionNames } from './redux/kontaktinformasjon';
import { actionNames as egenAnsattActionNames } from './redux/egenansatt';
import { actionNames as vergeMålActionNames } from './redux/vergemal';
import { getMockKontaktinformasjon } from './mock/kontaktinformasjon-mock';
import { personinformasjonActionNames } from './redux/personinformasjon';
import { getPerson } from './mock/person/personMock';
import { erEgenAnsatt } from './mock/egenansatt-mock';

export const testStore = createStore(reducers);
const aremarkFnr = '10108000398';

testStore.dispatch({ type: personinformasjonActionNames.OK, data: getPerson(aremarkFnr)});
testStore.dispatch({ type: navKontorActionNames.OK, data: getMockNavKontor('0118', undefined) });
testStore.dispatch({ type: kontaktinformasjonActionNames.OK, data: getMockKontaktinformasjon(aremarkFnr) });
testStore.dispatch({ type: egenAnsattActionNames.OK, data: erEgenAnsatt(aremarkFnr) });
testStore.dispatch({ type: vergeMålActionNames.OK, data: mockVergemal(aremarkFnr) });
