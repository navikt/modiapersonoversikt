import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRootRoute, createRoute, createRouter, RouterProvider } from '@tanstack/react-router';
import { render } from '@testing-library/react';
import { createStore, Provider as JProvider } from 'jotai';
import type { ReactElement, ReactNode } from 'react';
import { aktivBrukerAtom } from 'src/lib/state/context';
import { aremark } from 'src/mock/persondata/aremark';
import { DialogpanelStateProvider } from '../context/dialogpanel-state';
import { MeldingsokProvider } from '../context/meldingsok';
import { ValgtEnhetProvider } from '../context/valgtenhet-state';
import { VisittkortStateProvider } from '../context/visittkort-state';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            staleTime: Number.POSITIVE_INFINITY,
            _optimisticResults: 'isRestoring'
        }
    }
});

const setupTestRouter = (fnr: string, children: ReactNode) => {
    const rootRoute = createRootRoute();

    const jstore = createStore();
    jstore.set(aktivBrukerAtom, fnr);

    const routeTree = rootRoute.addChildren([
        createRoute({
            getParentRoute: () => rootRoute,
            path: '$',
            component: () => (
                <JProvider store={jstore}>
                    <QueryClientProvider client={queryClient}>
                        <DialogpanelStateProvider>
                            <VisittkortStateProvider>
                                <MeldingsokProvider>
                                    <ValgtEnhetProvider>{children}</ValgtEnhetProvider>
                                </MeldingsokProvider>
                            </VisittkortStateProvider>
                        </DialogpanelStateProvider>
                    </QueryClientProvider>
                </JProvider>
            )
        })
    ]);

    return createRouter({
        routeTree
    });
};

export const renderWithProviders = async (children: ReactElement, fnr = aremark.personIdent) => {
    const testRouter = setupTestRouter(fnr, children);
    const testRendered = render(<RouterProvider router={testRouter} />);
    await testRouter.load();
    return testRendered;
};
