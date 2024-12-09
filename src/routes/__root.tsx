import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, createRootRoute, useMatchRoute } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { type PropsWithChildren, lazy } from 'react';
import HentGlobaleVerdier from 'src/app/FetchSessionInfoOgLeggIRedux';
import LoggetUtModal from 'src/app/LoggetUtModal';
import VelgEnhet from 'src/app/VelgEnhet';
import Decorator from 'src/app/internarbeidsflatedecorator/Decorator';
import DemoBanner from 'src/components/DemoBanner';
import ErrorBoundary from 'src/components/ErrorBoundary';
import NotFound from 'src/components/NotFound';
import { ValgtEnhetProvider } from 'src/context/valgtenhet-state';
import { aktivEnhetAtom } from 'src/lib/state/context';
import { usePersistentWWLogin } from 'src/login/use-persistent-ww-login';
import HandleLegacyUrls from 'src/utils/HandleLegacyUrls';
import styled from 'styled-components';

export const Route = createRootRoute({
    component: RootLayout,
    notFoundComponent: NotFound
});

const minutes = 60 * 1000;
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 10 * minutes,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: false
        }
    }
});

function App({ children }: PropsWithChildren) {
    const loginState = usePersistentWWLogin();
    const valgtEnhet = useAtomValue(aktivEnhetAtom);

    if (!valgtEnhet) {
        /**
         * valgt enhet hentes fra modiacontextholder, og mellomlagres i localStorage
         */
        return (
            <>
                <LoggetUtModal loginState={loginState} />
                <VelgEnhet />
            </>
        );
    }
    return (
        <>
            <LoggetUtModal loginState={loginState} />
            <HentGlobaleVerdier />
            <div className="flex flex-auto h-0">{children}</div>
        </>
    );
}

const TanStackRouterDevtools = import.meta.env.DEV
    ? lazy(() => import('@tanstack/router-devtools').then((res) => ({ default: res.TanStackRouterDevtools })))
    : () => null;

const AppStyle = styled.div`
    height: 100vh;
    @media print {
        height: auto;
    }
    display: flex;
    flex-flow: column nowrap;
`;

function RootLayout() {
    const matchRoute = useMatchRoute();
    const isLanding = matchRoute({ to: '/landingpage' });

    return (
        <QueryClientProvider client={queryClient}>
            <ValgtEnhetProvider>
                {isLanding ? (
                    <Outlet />
                ) : (
                    <AppStyle>
                        <HandleLegacyUrls>
                            <DemoBanner />
                            <Decorator />
                            <ErrorBoundary boundaryName="app-content">
                                <App>
                                    <Outlet />
                                </App>
                            </ErrorBoundary>
                        </HandleLegacyUrls>
                    </AppStyle>
                )}
                <TanStackRouterDevtools />
            </ValgtEnhetProvider>
        </QueryClientProvider>
    );
}
