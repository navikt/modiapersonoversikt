import dayjs from 'dayjs';
import MockDate from 'mockdate';
import 'dayjs/locale/nb';
import './extra-polyfills';
import 'jest-styled-components';
import '@testing-library/jest-dom/vitest';
import { setGlobalOrigin } from 'undici';
import { vi } from 'vitest';
import { server } from './mock/node';
dayjs.locale('nb');

const globalAny = global;
// @ts-expect-error dårlig typer
globalAny._mockEnabled = 'true';

// Mocker funksjoner som returnerer dynamisk data
MockDate.set(0);
import JSutils from 'nav-frontend-js-utils';
import type { PropsWithChildren } from 'react';
JSutils.guid = () => 'Helt tilfeldig ID';
JSutils.getScrollParents = () => [];

window.frontendlogger = { info: () => null, warn: () => null, error: () => null, event: () => null };

window.matchMedia = () => {
    const querylist = {
        matches: true,
        addEventListener() {},
        removeEventListener() {}
    };
    return querylist as unknown as MediaQueryList;
};

// @ts-expect-error dårlig typer
global.Worker = undefined;

// Mock react collapse sin UnmountClosed
vi.mock('react-collapse', () => {
    return {
        UnmountClosed: (props: PropsWithChildren) => props.children
    };
});

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => {
    setGlobalOrigin(window.location.href);
    server.resetHandlers();
});
afterAll(() => server.close());
