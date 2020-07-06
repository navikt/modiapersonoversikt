import 'core-js/stable';
import { configure } from 'enzyme';
import EnzymeReactAdapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import 'jest-styled-components';

configure({ adapter: new EnzymeReactAdapter() });

const globalAny: any = global;
globalAny._mockEnabled = 'true';

// Mocker funksjoner som returnerer dynamisk data
Date.now = jest.fn(() => 0);
const JSutils = require('nav-frontend-js-utils');
JSutils.guid = jest.fn(() => 'Helt tilfeldig ID');
JSutils.getScrollParents = () => [];

window['frontendlogger'] = { info: () => null, warn: () => null, error: () => null, event: () => null };

// Mock react collapse sin UnmountClosed
jest.mock('react-collapse', () => {
    return {
        // @ts-ignore
        UnmountClosed: props => props.children
    };
});
