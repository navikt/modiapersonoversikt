import { Alert, HStack, Loader, Theme } from '@navikt/ds-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, createRootRoute, useMatchRoute } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { type PropsWithChildren, lazy, useState } from 'react';
import { Toaster } from 'sonner';
import HentGlobaleVerdier from 'src/app/FetchSessionInfoOgLeggIRedux';
import LoggetUtModal from 'src/app/LoggetUtModal';
import VelgEnhet from 'src/app/VelgEnhet';
import Decorator from 'src/app/internarbeidsflatedecorator/Decorator';
import DemoBanner from 'src/components/DemoBanner';
import ErrorBoundary from 'src/components/ErrorBoundary';
import NotFound from 'src/components/NotFound';
import { NyModia } from 'src/components/NyModia';
import { ValgtEnhetProvider } from 'src/context/valgtenhet-state';
import { aktivBrukerLastetAtom, aktivEnhetAtom } from 'src/lib/state/context';
import { ThemeProvider, themeAtom } from 'src/lib/state/theme';
import { usePersistentWWLogin } from 'src/login/use-persistent-ww-login';
import HandleLegacyUrls from 'src/utils/HandleLegacyUrls';
import useTimeout from 'src/utils/hooks/use-timeout';

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

const AppWrapper = ({ children }: PropsWithChildren) => (
    <div className="h-svh print:h-auto flex flex-col flex-nowrap">{children}</div>
);

function RootLayout() {
    const matchRoute = useMatchRoute();
    const isLanding = matchRoute({ to: '/landingpage' });
    const isNewModia = matchRoute({ to: '/new/person', fuzzy: true }) !== false;
    const theme = useAtomValue(themeAtom);

    return (
        <QueryClientProvider client={queryClient}>
            <Theme hasBackground={isNewModia} theme={isNewModia ? theme : 'light'}>
                <ThemeProvider />
                <ValgtEnhetProvider>
                    {isLanding ? (
                        <Outlet />
                    ) : (
                        <AppWrapper>
                            <HandleLegacyUrls>
                                <DemoBanner />
                                <NyModia />
                                <Decorator />
                                <ErrorBoundary boundaryName="app-content">
                                    <App>
                                        <Outlet />
                                    </App>
                                </ErrorBoundary>
                            </HandleLegacyUrls>
                        </AppWrapper>
                    )}
                    <TanStackRouterDevtools position="bottom-right" />
                    <Toaster position="top-right" theme={theme} richColors />
                </ValgtEnhetProvider>
            </Theme>
        </QueryClientProvider>
    );
}
