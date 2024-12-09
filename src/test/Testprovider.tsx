import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, RouterProvider, createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import { Provider as JProvider, createStore } from 'jotai';
import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import type { Store } from 'redux';
import { aktivBrukerAtom } from 'src/lib/state/context';
import { DialogpanelStateProvider } from '../context/dialogpanel-state';
import { MeldingsokProvider } from '../context/meldingsok';
import { ValgtEnhetProvider } from '../context/valgtenhet-state';
import { VisittkortStateProvider } from '../context/visittkort-state';
import type { AppState } from '../redux/reducers';
import { getTestStore } from './testStore';

interface Props {
    children: ReactNode;
    customStore?: Store<AppState>;
}
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            staleTime: Number.POSITIVE_INFINITY,
            _optimisticResults: 'isRestoring'
        }
    }
});

function TestProvider({ children, customStore }: Props) {
    const rootRoute = createRootRoute({ component: Outlet });
    const store = customStore || getTestStore();

    const jstore = createStore();
    jstore.set(aktivBrukerAtom, store.getState().gjeldendeBruker.fødselsnummer);

    const router = createRouter({
        routeTree: rootRoute.addChildren([
            createRoute({
                getParentRoute: () => rootRoute,
                path: '$',
                component: () => (
                    <Provider store={store}>
                        <JProvider store={jstore}>
                            <QueryClientProvider client={queryClient}>
                                <DialogpanelStateProvider>
                                    <VisittkortStateProvider>
                                        <MeldingsokProvider>
                                            <ValgtEnhetProvider>
                                                <>{children}</>
                                            </ValgtEnhetProvider>
                                        </MeldingsokProvider>
                                    </VisittkortStateProvider>
                                </DialogpanelStateProvider>
                            </QueryClientProvider>
                        </JProvider>
                    </Provider>
                )
            })
        ])
    });

    return <RouterProvider router={router}></RouterProvider>;
}

export default TestProvider;
