import { createBrowserHistory, createRouter as createReactRouter } from '@tanstack/react-router';

import type { PropsWithChildren } from 'react';
import { routeTree } from './routeTree.gen';

const history = createBrowserHistory();

export function createRouter({ Wrap }: { Wrap?: ({ children }: PropsWithChildren) => React.JSX.Element } = {}) {
    return createReactRouter({
        routeTree,
        context: {
            head: ''
        },
        defaultPreload: 'intent',
        history,
        Wrap,
        basepath: import.meta.env.BASE_URL
    });
}

declare module '@tanstack/react-router' {
    interface Register {
        router: ReturnType<typeof createRouter>;
    }
}
