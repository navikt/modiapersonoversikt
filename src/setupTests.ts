import { configure } from 'enzyme';
import EnzymeReactAdapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import 'babel-polyfill';
import 'jest-styled-components';

configure({ adapter: new EnzymeReactAdapter() });

const globalAny: any = global;
globalAny._apiBaseUri = '';
globalAny._mockEnabled = 'true';

// Mocker funksjoner som returnerer dynamisk data
Date.now = jest.fn(() => 0);
const JSutils = require('nav-frontend-js-utils');
JSutils.guid = jest.fn(() => 'Helt tilfeldig ID');

window['frontendlogger'] = { info: () => null, warn: () => null, error: () => null, event: () => null };
