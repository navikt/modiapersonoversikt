import { createBrowserHistory, createRouter as createReactRouter } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';

export const history = createBrowserHistory();

export function createRouter() {
    return createReactRouter({
        routeTree,
        context: {
            head: ''
        },
        defaultPreload: 'intent',
        history
    });
}

declare module '@tanstack/react-router' {
    interface Register {
        router: ReturnType<typeof createRouter>;
    }
}
