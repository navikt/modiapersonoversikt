import { configure } from 'enzyme';
import EnzymeReactAdapter17 from '@wojtekmaj/enzyme-adapter-react-17';
import * as EnzymeContainer from './test/enzyme-container';
import MockDate from 'mockdate';
import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import './extra-polyfills';
import 'jest-styled-components';
import { vi } from 'vitest';
dayjs.locale('nb');

configure({ adapter: new EnzymeReactAdapter17() });

const globalAny = global;
// @ts-expect-error dårlig typer
globalAny._mockEnabled = 'true';

// Mocker funksjoner som returnerer dynamisk data
MockDate.set(0);
import JSutils from 'nav-frontend-js-utils';
import { PropsWithChildren } from 'react';
JSutils.guid = () => 'Helt tilfeldig ID';
JSutils.getScrollParents = () => [];

window['frontendlogger'] = { info: () => null, warn: () => null, error: () => null, event: () => null };

window.matchMedia = () => {
    const querylist = {
        matches: true,
        addEventListener() {},
        removeEventListener() {}
    };
    return querylist as unknown as MediaQueryList;
};

// @ts-expect-error dårlig typer
global['Worker'] = undefined;

// Mock react collapse sin UnmountClosed
vi.mock('react-collapse', () => {
    return {
        // @ts-expect-error dårlig typer
        UnmountClosed: (props: PropsWithChildren) => props.children
    };
});

beforeEach(EnzymeContainer.beforeEachHandler);
afterEach(EnzymeContainer.afterEachHandler);

beforeAll(async () => {
    await import('./mock');
});
