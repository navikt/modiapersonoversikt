import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { Alert, Button, GlobalAlert, HStack, Link, Loader, Theme } from '@navikt/ds-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRootRoute, Outlet, useMatchRoute } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { lazy, type PropsWithChildren, useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import HentGlobaleVerdier from 'src/app/FetchSessionInfoOgLeggIRedux';
import Decorator from 'src/app/internarbeidsflatedecorator/Decorator';
import LoggetUtModal from 'src/app/LoggetUtModal';
import VelgEnhet from 'src/app/VelgEnhet';
import DemoBanner from 'src/components/DemoBanner';
import ErrorBoundary from 'src/components/ErrorBoundary';
import NotFound from 'src/components/NotFound';
import { nyModiaAtom, useNavigateToNewOrOldModia } from 'src/components/NyModia';
import { SkyraHandler } from 'src/components/SkyraHandler';
import { ValgtEnhetProvider } from 'src/context/valgtenhet-state';
import { aktivBrukerAtom, aktivBrukerLastetAtom, aktivEnhetAtom } from 'src/lib/state/context';
import { ThemeProvider, themeAtom } from 'src/lib/state/theme';
import { usePersistentWWLogin } from 'src/login/use-persistent-ww-login';
import HandleLegacyUrls from 'src/utils/HandleLegacyUrls';
import useTimeout from 'src/utils/hooks/use-timeout';
import { usePageTracking } from 'src/utils/hooks/usePageTracking';

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

    useNavigateToNewOrOldModia();
    usePageTracking();

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

const SkipNavigasjonsLink = () => {
    return (
        <Button href="#main-content" as={Link} className="absolute not-focus:-left-full top-0 ">
            Hopp over navigasjon
        </Button>
    );
};

function RootLayout() {
    const matchRoute = useMatchRoute();
    const isLanding = matchRoute({ to: '/landingpage' });
    const isPersonvern = matchRoute({ to: '/personvern' });
    const isNewModia = matchRoute({ to: '/new/person', fuzzy: true }) !== false;
    const aktivBruker = useAtomValue(aktivBrukerAtom);
    const nyModiaEnabled = useAtomValue(nyModiaAtom);
    const visUtfasingVarsel = !!aktivBruker && !nyModiaEnabled && matchRoute({ to: '/new', fuzzy: true }) === false;
    const theme = useAtomValue(themeAtom);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    return (
        <QueryClientProvider client={queryClient}>
            <Theme hasBackground={isNewModia} theme={isNewModia ? theme : 'light'}>
                <ThemeProvider />
                <SkyraHandler />
                <ValgtEnhetProvider>
                    {isLanding || isPersonvern ? (
                        <Outlet />
                    ) : (
                        <AppWrapper>
                            <SkipNavigasjonsLink />
                            <HandleLegacyUrls>
                                <DemoBanner />
                                <Decorator />
                                {visUtfasingVarsel && (
                                    <GlobalAlert status="warning" centered={true} size="small">
                                        <GlobalAlert.Header>
                                            <GlobalAlert.Title>Gamle Modia fases ut 1. desember 2026</GlobalAlert.Title>
                                        </GlobalAlert.Header>
                                        <GlobalAlert.Content>
                                            Etter denne datoen må du bruke Ny Modia. Vi anbefaler at du tar den i bruk
                                            allerede nå, så du blir kjent med løsningen i god tid.
                                        </GlobalAlert.Content>
                                        <GlobalAlert.Content>
                                            Ved mangler i Ny Modia, meld fra i{' '}
                                            <Link
                                                href="https://jira.adeo.no/plugins/servlet/desk/portal/541"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Porten
                                                <ExternalLinkIcon aria-hidden />
                                            </Link>
                                        </GlobalAlert.Content>
                                    </GlobalAlert>
                                )}
                                <ErrorBoundary boundaryName="app-content">
                                    <App>
                                        <Outlet />
                                    </App>
                                </ErrorBoundary>
                            </HandleLegacyUrls>
                        </AppWrapper>
                    )}
                    <TanStackRouterDevtools position="bottom-right" />
                    <Toaster position="bottom-right" theme={theme} richColors />
                </ValgtEnhetProvider>
            </Theme>
        </QueryClientProvider>
    );
}
