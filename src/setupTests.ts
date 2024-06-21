import MockDate from 'mockdate';
import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import './extra-polyfills';
import 'jest-styled-components';
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';
dayjs.locale('nb');

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
        UnmountClosed: (props: PropsWithChildren) => props.children
    };
});

beforeAll(async () => {
    await import('./mock');
});
