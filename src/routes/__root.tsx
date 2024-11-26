import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRootRoute, Outlet, useMatchRoute } from '@tanstack/react-router';
import React from 'react';
import Decorator from 'src/app/internarbeidsflatedecorator/Decorator';
import { LandingPage } from 'src/app/internarbeidsflatedecorator/LandingPage';
import DemoBanner from 'src/components/DemoBanner';
import NotFound from 'src/components/NotFound';
import { ValgtEnhetProvider } from 'src/context/valgtenhet-state';
import { initAmplitude } from 'src/utils/amplitude';
import { initializeObservability } from 'src/utils/observability';
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

const TanStackRouterDevtools = import.meta.env.DEV
    ? React.lazy(() => import('@tanstack/router-devtools').then((res) => ({ default: res.TanStackRouterDevtools })))
    : () => null;

initAmplitude();
initializeObservability();

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
                    <LandingPage />
                ) : (
                    <AppStyle>
                        <DemoBanner />
                        <Decorator />
                        <Outlet />
                    </AppStyle>
                )}
                <TanStackRouterDevtools />
            </ValgtEnhetProvider>
        </QueryClientProvider>
    );
}
