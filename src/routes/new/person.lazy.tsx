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
        <HStack className="new-modia" gap="1" padding="2" flexGrow="1" wrap={false}>
            <VStack>
                <PersonSidebarMenu />
            </VStack>
            <PanelGroup direction="horizontal" autoSaveId="person-content">
                <Panel order={1} className="mr-2 overflow-scroll">
                    <Box as="main" id="main-content" height="100%">
                        <VStack gap="2" height="100%">
                            <VStack className="ml-2">
                                <PersonLinje />
                            </VStack>
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
    );
}
