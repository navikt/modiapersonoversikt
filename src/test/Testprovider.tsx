import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import { render } from '@testing-library/react';
import { Provider as JProvider, createStore } from 'jotai';
import type { ReactElement, ReactNode } from 'react';
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

const TestStoreWithoutRouter = ({ customStore, children }: Props) => {
    const store = customStore || getTestStore();

    const jstore = createStore();
    jstore.set(aktivBrukerAtom, store.getState().gjeldendeBruker.fødselsnummer);
    return (
        <Provider store={store}>
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
        </Provider>
    );
};

const setupTestRouter = (customStore: Props['customStore'], children: Props['children']) => {
    const rootRoute = createRootRoute();
    const store = customStore || getTestStore();

    const jstore = createStore();
    jstore.set(aktivBrukerAtom, store.getState().gjeldendeBruker.fødselsnummer);

    const routeTree = rootRoute.addChildren([
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
                                        <ValgtEnhetProvider>{children}</ValgtEnhetProvider>
                                    </MeldingsokProvider>
                                </VisittkortStateProvider>
                            </DialogpanelStateProvider>
                        </QueryClientProvider>
                    </JProvider>
                </Provider>
            )
        })
    ]);

    return createRouter({
        routeTree
    });
};

export const renderWithProviders = async (children: ReactElement, customStore?: Props['customStore']) => {
    const testRouter = setupTestRouter(customStore, children);
    const testRendered = render(<RouterProvider router={testRouter} />);
    await testRouter.load();
    return testRendered;
};
