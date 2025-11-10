import { createBrowserHistory, createHashHistory, createRouter as createReactRouter } from '@tanstack/react-router';

import type { PropsWithChildren } from 'react';
import { routeTree } from './routeTree.gen';

const history = import.meta.env.VITE_USE_HASH_ROUTER === 'true' ? createHashHistory() : createBrowserHistory();

export function createRouter({ Wrap }: { Wrap?: ({ children }: PropsWithChildren) => React.JSX.Element } = {}) {
    return createReactRouter({
        routeTree,
        context: {
            head: ''
        },
        defaultPreload: 'intent',
        history,
        Wrap
    });
}

export interface UmamiEvent {
    name?: string;
    data?: Record<string, unknown>;
}

declare module '@tanstack/react-router' {
    interface Register {
        router: ReturnType<typeof createRouter>;
    }
    interface HistoryState {
        umamiEvent?: UmamiEvent;
    }
}
