import { configure } from 'enzyme';
import EnzymeReactAdapter17 from '@wojtekmaj/enzyme-adapter-react-17';
import * as EnzymeContainer from './test/enzyme-container';
import MockDate from 'mockdate';
import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import 'jest-enzyme';
import 'jest-styled-components';
import './extra-polyfills';
dayjs.locale('nb');

configure({ adapter: new EnzymeReactAdapter17() });

const globalAny: any = global;
globalAny._mockEnabled = 'true';

// Mocker funksjoner som returnerer dynamisk data
MockDate.set(0);
const JSutils = require('nav-frontend-js-utils');
JSutils.guid = () => 'Helt tilfeldig ID';
JSutils.getScrollParents = () => [];

window['frontendlogger'] = { info: () => null, warn: () => null, error: () => null, event: () => null };

window.matchMedia = (query: string) => {
    const querylist = {
        matches: true,
        addEventListener() {},
        removeEventListener() {}
    };
    return querylist as unknown as MediaQueryList;
};

// Mock react collapse sin UnmountClosed
jest.mock('react-collapse', () => {
    return {
        // @ts-ignore
        UnmountClosed: (props) => props.children
    };
});

jest.mock('./login/metaUrl.ts', () => ({
    META_URL: 'https://mock.com'
}));

beforeEach(EnzymeContainer.beforeEachHandler);
afterEach(EnzymeContainer.afterEachHandler);
