import { configure } from 'enzyme';
import EnzymeReactAdapter17 from '@wojtekmaj/enzyme-adapter-react-17';
import * as EnzymeContainer from './test/enzyme-container';
import MockDate from 'mockdate';
import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import 'jest-enzyme';
import 'jest-styled-components';
import './extra-polyfills';
import { IWebWorkerCom } from './login/WebWorkerCommunicator';
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

global['Worker'] = undefined;

// Mock react collapse sin UnmountClosed
jest.mock('react-collapse', () => {
    return {
        // @ts-ignore
        UnmountClosed: (props) => props.children
    };
});

/**
 * Jest har ikke støtte for import.meta som må brukes for å kunne lage WebWorker med Webpack p.t.
 * I framtiden burde man fjerne denne mocken når man skriver seg bort fra legacy pakker.
 */

const workerMock: IWebWorkerCom = {
    initialize: () => null,
    onAuthChange: () => null,
    onUserActive: () => null,
    stop: () => null
};
jest.mock('./login/persistentLoginWebWorkerFactory.ts', () => ({
    persistentLoginWebworkerFactory: () => workerMock
}));

beforeEach(EnzymeContainer.beforeEachHandler);
afterEach(EnzymeContainer.afterEachHandler);
