import { Box, HStack, VStack } from '@navikt/ds-react';
import { Navigate, Outlet, createLazyFileRoute } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { Suspense } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { PersonLinje } from 'src/components/PersonLinje';
import { PersonSidebarMenu } from 'src/components/PersonSidebar';
import { LukkbarNyMelding } from 'src/components/melding/LukkbarNyMelding';
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
        <HStack className="new-modia" gap="2" padding="2" flexGrow="1" wrap={false}>
            <VStack>
                <PersonSidebarMenu />
            </VStack>
            <PanelGroup direction="horizontal" autoSaveId="person-content">
                <Panel order={1} className="mr-2">
                    <VStack gap="2" height="100%">
                        <Box flexGrow="0">
                            <PersonLinje />
                        </Box>
                        <Suspense>
                            <Outlet />
                        </Suspense>
                    </VStack>
                </Panel>
                <PanelResizeHandle className="hover:bg-surface-neutral-subtle-hover w-1 focus:bg-blue-50" />
                <LukkbarNyMelding />
            </PanelGroup>
        </HStack>
    );
}
