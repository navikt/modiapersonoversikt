import { createLazyFileRoute, Navigate, useNavigate } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import PersonoversiktWrapper from 'src/app/personside/Personoversikt';
import { aktivBrukerAtom } from 'src/lib/state/context';

export const Route = createLazyFileRoute('/new/person/')({
    component: PersonRoute
});

function PersonRoute() {
    const aktivBruker = useAtomValue(aktivBrukerAtom);
    const navigate = useNavigate();

    if (!aktivBruker) {
        navigate({ to: '/' });
    }

    return aktivBruker ? <PersonoversiktWrapper fnr={aktivBruker} /> : <Navigate to="/" />;
}
