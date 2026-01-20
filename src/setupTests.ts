import dayjs from 'dayjs';
import type { PropsWithChildren } from 'react';
import 'dayjs/locale/nb';
import './extra-polyfills';
import 'jest-styled-components';
import '@testing-library/jest-dom/vitest';
import { setGlobalOrigin } from 'undici';
import { vi } from 'vitest';
import { server } from './mock/node';

dayjs.locale('nb');

// Mocker funksjoner som returnerer dynamisk data
import JSutils from 'nav-frontend-js-utils';

JSutils.guid = () => 'Helt tilfeldig ID';
JSutils.getScrollParents = () => [];

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

vi.setSystemTime(0);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => {
    setGlobalOrigin(window.location.href);
    server.resetHandlers();
});
afterAll(() => server.close());
