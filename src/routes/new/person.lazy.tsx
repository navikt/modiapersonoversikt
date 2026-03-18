import { Alert, Box, HStack, Skeleton, VStack } from '@navikt/ds-react';
import { createLazyFileRoute, Navigate, Outlet } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { Suspense } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { LukkbarNyMelding } from 'src/components/melding/LukkbarNyMelding';
import { PersonLinje } from 'src/components/PersonLinje';
import { PersonSidebarMenu } from 'src/components/PersonSidebar';
import BegrensetTilgangBegrunnelse from 'src/components/person/BegrensetTilgangBegrunnelse';
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

function PersonLayout() {
    return (
        <VStack className="new-modia  overflow-hidden" flexGrow="1" gap="space-4">
            <VStack className="shrink-0 overflow-auto">
                <PersonLinje />
            </VStack>
            <HStack minHeight="0" gap="space-4" wrap={false} className="h-full">
                <VStack>
                    <PersonSidebarMenu />
                </VStack>
                <PanelGroup direction="horizontal" autoSaveId="person-content">
                    <Panel order={1} className="overflow-scroll">
                        <Box as="main" id="main-content" height="100%">
                            <VStack gap="space-4" height="100%">
                                <Suspense>
                                    <Outlet />
                                </Suspense>
                            </VStack>
                        </Box>
                    </Panel>
                    <PanelResizeHandle
                        aria-hidden
                        tabIndex={-1}
                        className="hover:bg-ax-bg-neutral-moderate-hover w-1 focus:bg-ax-brand-blue-100"
                    />
                    <LukkbarNyMelding />
                </PanelGroup>
            </HStack>
        </VStack>
    );
}
