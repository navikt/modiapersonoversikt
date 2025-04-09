import { createBrowserHistory, createHashHistory, createRouter as createReactRouter } from '@tanstack/react-router';

import type { PropsWithChildren } from 'react';
import { routeTree } from './routeTree.gen';

const history = import.meta.env.VITE_USE_HASH_ROUTER ? createHashHistory() : createBrowserHistory();

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

declare module '@tanstack/react-router' {
    interface Register {
        router: ReturnType<typeof createRouter>;
    }
}
