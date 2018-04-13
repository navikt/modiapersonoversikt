import { configure } from 'enzyme';
import * as EnzymeReactAdapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import 'babel-polyfill';

configure({ adapter: new EnzymeReactAdapter() });

// tslint:disable-next-line
const globalAny: any = global;
globalAny._apiBaseUri = '';

import reducers from './redux/reducer';
import { createStore } from 'redux';

export const testStore = createStore(reducers);
