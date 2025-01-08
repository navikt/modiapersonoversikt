import { Alert, HStack, Loader } from '@navikt/ds-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, createRootRoute, useMatchRoute } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { type PropsWithChildren, lazy, useState } from 'react';
import HentGlobaleVerdier from 'src/app/FetchSessionInfoOgLeggIRedux';
import LoggetUtModal from 'src/app/LoggetUtModal';
import VelgEnhet from 'src/app/VelgEnhet';
import Decorator from 'src/app/internarbeidsflatedecorator/Decorator';
import DemoBanner from 'src/components/DemoBanner';
import ErrorBoundary from 'src/components/ErrorBoundary';
import NotFound from 'src/components/NotFound';
import { ValgtEnhetProvider } from 'src/context/valgtenhet-state';
import { aktivBrukerLastetAtom, aktivEnhetAtom } from 'src/lib/state/context';
import { ThemeProvider } from 'src/lib/state/theme';
import { usePersistentWWLogin } from 'src/login/use-persistent-ww-login';
import HandleLegacyUrls from 'src/utils/HandleLegacyUrls';
import useTimeout from 'src/utils/hooks/use-timeout';
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
    const contextLoaded = useAtomValue(aktivBrukerLastetAtom);
    const [contextTimeout, setContextTimeout] = useState(false);
    useTimeout(() => {
        setContextTimeout(true);
    }, 1500);

    if (!contextLoaded && contextTimeout) {
        return (
            <HStack justify="center" align="center" minHeight="80dvh">
                <Alert variant="warning">
                    Klarte ikke laste context (aktiv enhet, aktiv bruker). Du kan fortsatt søke opp person, men må
                    manuelt sjekke at du har valgt riktig enhet i menyen.
                </Alert>
            </HStack>
        );
    }

    if (!contextLoaded) {
        return (
            <HStack justify="center" align="center" minHeight="80dvh">
                <Loader size="3xlarge" title="Laster inn enhet..." />
            </HStack>
        );
    }

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
    ? lazy(() =>
          import('@tanstack/router-devtools').then((res) => ({
              default: res.TanStackRouterDevtools
          }))
      )
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
            <ThemeProvider />
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
                <TanStackRouterDevtools position="bottom-right" />
            </ValgtEnhetProvider>
        </QueryClientProvider>
    );
}
