import { Box, HStack, VStack } from '@navikt/ds-react';
import { createLazyFileRoute, Navigate, Outlet } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { Suspense } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { LukkbarNyMelding } from 'src/components/melding/LukkbarNyMelding';
import { PersonLinje } from 'src/components/PersonLinje';
import { PersonSidebarMenu } from 'src/components/PersonSidebar';
import { aktivBrukerAtom } from 'src/lib/state/context';

export const Route = createLazyFileRoute('/new/person')({
    component: PersonRoute
});

function PersonRoute() {
    const aktivBruker = useAtomValue(aktivBrukerAtom);

    if (!aktivBruker) {
        return <Navigate to="/" />;
    }

    return <PersonLayout />;
}

function PersonLayout() {
    return (
        <VStack className="new-modia h-dvh overflow-hidden" flexGrow="1">
            <VStack className="shrink-0 px-1 mt-1 overflow-auto">
                <PersonLinje />
            </VStack>
            <HStack minHeight="0" gap="1" padding="1" wrap={false} className="h-full">
                <VStack>
                    <PersonSidebarMenu />
                </VStack>
                <PanelGroup direction="horizontal" autoSaveId="person-content">
                    <Panel order={1} className="overflow-scroll">
                        <Box as="main" id="main-content" height="100%">
                            <VStack gap="1" height="100%">
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
            <HStack className="h-14" />
        </VStack>
    );
}
