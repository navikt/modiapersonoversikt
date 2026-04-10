import { Alert, Box, Heading, HStack, Skeleton, VStack } from '@navikt/ds-react';
import { createLazyFileRoute, Navigate, Outlet, useRouterState } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { Suspense, useEffect, useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { TraadList } from 'src/components/Meldinger/List';
import { LukkbarNyMelding } from 'src/components/melding/LukkbarNyMelding';
import { PersonLinje } from 'src/components/PersonLinje';
import { PersonSidebarMenu } from 'src/components/PersonSidebar';
import BegrensetTilgangBegrunnelse from 'src/components/person/BegrensetTilgangBegrunnelse';
import { YtelserList } from 'src/components/ytelser/List';
import { useTilgangskontroll } from 'src/lib/clients/modiapersonoversikt-api';
import { aktivBrukerAtom } from 'src/lib/state/context';
import type { IkkeTilgangArsak } from 'src/rest/resources/tilgangskontrollResource';
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
    if (!tilgang.data.harTilgang)
        return (
            <div className="flex-1">
                <Alert variant="warning">
                    <BegrensetTilgangBegrunnelse begrunnelseType={tilgang.data.ikkeTilgangArsak as IkkeTilgangArsak} />
                </Alert>
            </div>
        );

    return <PersonLayout />;
}

const MOBILE_BREAKPOINT = '(max-width: 767px)';

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
    <PanelResizeHandle
        aria-hidden
        tabIndex={-1}
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
    const isMobile = useIsMobile();

    const listPanel = (
        <VStack height={{ md: '100%' }} overflow={{ md: 'hidden' }}>
            {isMeldinger ? (
                <>
                    <Heading size="small" visuallyHidden level="2">
                        Dialoger
                    </Heading>
                    <TraadList />
                </>
            ) : isYtelser ? (
                <>
                    <Heading size="small" visuallyHidden level="2">
                        Ytelser
                    </Heading>
                    <YtelserList />
                </>
            ) : null}
        </VStack>
    );

    return (
        <VStack className="new-modia  overflow-hidden" flexGrow="1" gap="space-4">
            <VStack className="shrink-0 overflow-auto">
                <PersonLinje />
            </VStack>
            <HStack minHeight="0" gap="space-4" wrap={false} className="h-full">
                <VStack>
                    <PersonSidebarMenu />
                </VStack>
                <PanelGroup direction="horizontal" autoSaveId="person-outer">
                    <Panel order={1} className="overflow-hidden">
                        {isMobile ? (
                            <VStack className="h-full overflow-auto" gap="space-4">
                                {listPanel}
                                <Box as="main" id="main-content">
                                    <VStack gap="space-4">
                                        <Suspense>
                                            <Outlet />
                                        </Suspense>
                                    </VStack>
                                </Box>
                            </VStack>
                        ) : (
                            <PanelGroup
                                direction="horizontal"
                                autoSaveId={listPanel ? 'person-content-list' : 'person-content'}
                            >
                                {listPanel && (
                                    <>
                                        <Panel
                                            order={1}
                                            defaultSize={20}
                                            minSize={10}
                                            maxSize={40}
                                            className="overflow-hidden"
                                        >
                                            {listPanel}
                                        </Panel>
                                        <ResizeHandle />
                                    </>
                                )}
                                <Panel order={2} minSize={30} className="overflow-scroll">
                                    <Box as="main" id="main-content" height="100%">
                                        <VStack gap="space-4" height="100%">
                                            <Suspense>
                                                <Outlet />
                                            </Suspense>
                                        </VStack>
                                    </Box>
                                </Panel>
                            </PanelGroup>
                        )}
                    </Panel>
                    <ResizeHandle />
                    <LukkbarNyMelding />
                </PanelGroup>
            </HStack>
        </VStack>
    );
}
