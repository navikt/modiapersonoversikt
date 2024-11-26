import { ReactNode } from 'react';
import { getTestStore } from './testStore';
import { Provider } from 'react-redux';
import { createStore, Provider as JProvider } from 'jotai';
import { StaticRouter } from 'react-router';
import { Store } from 'redux';
import { AppState } from '../redux/reducers';
import { MeldingsokProvider } from '../context/meldingsok';
import { VisittkortStateProvider } from '../context/visittkort-state';
import { DialogpanelStateProvider } from '../context/dialogpanel-state';
import { ValgtEnhetProvider } from '../context/valgtenhet-state';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRootRoute, createRoute, createRouter, Outlet, RouterProvider } from '@tanstack/react-router';
import { aktivBrukerAtom } from 'src/lib/state/context';

interface Props {
    children: ReactNode;
    customStore?: Store<AppState>;
}
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            staleTime: Infinity,
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
                                                <StaticRouter context={{}}>
                                                    <>{children}</>
                                                </StaticRouter>
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
