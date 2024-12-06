import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { aktivBrukerAtom } from 'src/lib/state/context';
import { erGyldigishFnr } from 'src/utils/fnr-utils';

export const Route = createFileRoute('/person/$fnr')({
    component: FnrMatchRoute
});

function FnrMatchRoute() {
    const setAktivBruker = useSetAtom(aktivBrukerAtom);
    const search = useSearch({ strict: false });
    const navigate = useNavigate();
    const fnr = Route.useParams().fnr;

    useEffect(() => {
        if (erGyldigishFnr(fnr)) setAktivBruker(fnr);

        navigate({ to: '/person', search });
    }, [fnr, setAktivBruker]);

    return <div />;
}
