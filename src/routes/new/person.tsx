import { createFileRoute, Navigate } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import NotFound from 'src/components/NotFound';
import { aktivBrukerAtom } from 'src/lib/state/context';

function PersonNotFound() {
    const aktivBruker = useAtomValue(aktivBrukerAtom);
    if (!aktivBruker) {
        return <Navigate to="/new" replace />;
    }
    return <NotFound />;
}

export const Route = createFileRoute('/new/person')({
    notFoundComponent: PersonNotFound
});
