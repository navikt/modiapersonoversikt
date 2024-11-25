import { ReactNode } from 'react';
import { getTestStore } from './testStore';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { Store } from 'redux';
import { AppState } from '../redux/reducers';
import { MeldingsokProvider } from '../context/meldingsok';
import { VisittkortStateProvider } from '../context/visittkort-state';
import { DialogpanelStateProvider } from '../context/dialogpanel-state';
import { ValgtEnhetProvider } from '../context/valgtenhet-state';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRootRoute, createRoute, createRouter, Outlet, RouterProvider } from '@tanstack/react-router';

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
    const router = createRouter({
        routeTree: rootRoute.addChildren([
            createRoute({
                getParentRoute: () => rootRoute,
                path: '$',
                component: () => (
                    <Provider store={customStore || getTestStore()}>
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
                    </Provider>
                )
            })
        ])
    });

    return <RouterProvider router={router}></RouterProvider>;
}

export default TestProvider;
