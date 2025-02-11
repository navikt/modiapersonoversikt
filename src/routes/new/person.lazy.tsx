import { Box, HStack, VStack } from '@navikt/ds-react';
import { Navigate, Outlet, createLazyFileRoute } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { Suspense } from 'react';
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
            <HStack gap="2" flexGrow="1" className="flex-nowrap">
                <VStack gap="2" flexGrow="1">
                    <Box flexGrow="0">
                        <PersonLinje />
                    </Box>
                    <Suspense>
                        <Outlet />
                    </Suspense>
                </VStack>
                <VStack flexGrow="0">
                    <LukkbarNyMelding />
                </VStack>
            </HStack>
        </HStack>
    );
}
