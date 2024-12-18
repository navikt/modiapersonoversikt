import { HStack, VStack } from '@navikt/ds-react';
import { Navigate, Outlet, createLazyFileRoute } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
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
        <VStack className="w-full">
            <PersonLinje />
            <HStack>
                <PersonSidebarMenu />
                <Outlet />
            </HStack>
        </VStack>
    );
}
