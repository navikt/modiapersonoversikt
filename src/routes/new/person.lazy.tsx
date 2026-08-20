import { Alert, Box, Heading, HStack, Skeleton, VStack } from '@navikt/ds-react';
import { createLazyFileRoute, Navigate, Outlet, useRouterState } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { Suspense, useEffect, useState } from 'react';
import { Group, Panel, Separator, useDefaultLayout } from 'react-resizable-panels';
import { TraadList } from 'src/components/Meldinger/List';
import { MeldingPanel } from 'src/components/melding/MeldingPanel';
import { PersonLinje } from 'src/components/PersonLinje';
import { PersonSidebarMenu } from 'src/components/PersonSidebar';
import { YtelserList } from 'src/components/ytelser/List';
import { useTilgangskontroll } from 'src/lib/clients/modiapersonoversikt-api';
import { aktivBrukerAtom } from 'src/lib/state/context';
export const Route = createLazyFileRoute('/new/person')({
    component: PersonRoute
});

function PersonRoute() {
    const aktivBruker = useAtomValue(aktivBrukerAtom);

    if (!aktivBruker) {
        return <Navigate to="/" />;
    }

    return <PersonRouteMedTilgang />;
}

function PersonRouteMedTilgang() {
    const tilgang = useTilgangskontroll();

    if (tilgang.isPending) return <Skeleton variant="rectangle" height="4rem" />;
    if (tilgang.isError)
        return (
            <div className="flex-1">
                <Alert variant="error">Beklager. Det oppsto en feil ved sjekk av tilgang til bruker.</Alert>
            </div>
        );
    if (!tilgang.data.harTilgang) {
        return (
            <div className="flex-1">
                <Alert variant="warning">{tilgang.data.message ?? 'Feil sikkerhetsbegrensning'}</Alert>
            </div>
        );
    }
    return <PersonLayout />;
}

const MOBILE_BREAKPOINT = '(max-width: 479px)';

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_BREAKPOINT).matches);

    useEffect(() => {
        const mql = window.matchMedia(MOBILE_BREAKPOINT);
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
    }, []);

    return isMobile;
};

const ResizeHandle = () => (
    <Separator
        aria-label="Dra for å endre størrelse på panel"
        className="hover:bg-ax-bg-neutral-moderate-hover w-1 cursor-col-resize focus:bg-ax-brand-blue-100"
    />
);

function PersonLayout() {
    const isMeldinger = useRouterState({
        select: (s) => s.matches.some((m) => m.routeId.includes('/meldinger'))
    });
    const isYtelser = useRouterState({
        select: (s) => s.matches.some((m) => m.routeId.includes('/ytelser'))
    });

    const outerLayout = useDefaultLayout({
        id: 'panel-layout-meldinger-outer',
        storage: localStorage
    });

    const innerLayout = useDefaultLayout({
        id: 'panel-layout-meldinger-inner', // Assign a new, unique key for the nested group
        storage: localStorage
    });

    const isMobile = useIsMobile();

    const listPanel = isMeldinger ? (
        <VStack height={{ sm: '100%' }} overflow={{ sm: 'hidden' }}>
            <Heading size="small" visuallyHidden level="2">
                Dialoger
            </Heading>
            <TraadList />
        </VStack>
    ) : isYtelser ? (
        <VStack height={{ sm: '100%' }} overflow={{ sm: 'hidden' }}>
            <Heading size="small" visuallyHidden level="2">
                Ytelser
            </Heading>
            <YtelserList />
        </VStack>
    ) : null;

    return (
        <VStack className="new-modia overflow-hidden" flexGrow="1" gap="space-4" data-testid="person-route">
            <VStack className="shrink-0 overflow-auto">
                <PersonLinje />
            </VStack>
            <HStack minHeight="0" gap="space-4" wrap={false} className="h-full" as="main" id="main-content">
                <VStack>
                    <PersonSidebarMenu />
                </VStack>
                <Group
                    defaultLayout={outerLayout.defaultLayout}
                    orientation="horizontal"
                    onLayoutChange={(layout) => {
                        outerLayout.onLayoutChanged(layout, { isUserInteraction: true });
                    }}
                >
                    <Panel className="overflow-hidden" id="person-panel">
                        {isMobile ? (
                            <VStack className="h-full overflow-auto" gap="space-4">
                                {listPanel}
                                <VStack gap="space-4">
                                    <Suspense>
                                        <Outlet />
                                    </Suspense>
                                </VStack>
                            </VStack>
                        ) : (
                            <Group
                                defaultLayout={innerLayout.defaultLayout}
                                orientation="horizontal"
                                onLayoutChange={(layout) => {
                                    innerLayout.onLayoutChanged(layout, { isUserInteraction: true });
                                }}
                            >
                                {listPanel && (
                                    <>
                                        <Panel
                                            id="list-panel"
                                            defaultSize="20vh"
                                            minSize="10vh"
                                            maxSize="40vh"
                                            className="overflow-hidden"
                                        >
                                            {listPanel}
                                        </Panel>
                                        <ResizeHandle />
                                    </>
                                )}
                                <Panel
                                    id="main-content-panel"
                                    minSize="30vh"
                                    className="overflow-scroll"
                                    defaultSize="90%"
                                >
                                    <Box height="100%">
                                        <VStack gap="space-4" height="100%">
                                            <Suspense>
                                                <Outlet />
                                            </Suspense>
                                        </VStack>
                                    </Box>
                                </Panel>
                            </Group>
                        )}
                    </Panel>
                    <ResizeHandle />
                    <MeldingPanel />
                </Group>
            </HStack>
        </VStack>
    );
}
