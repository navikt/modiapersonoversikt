import { getRouteApi } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { useEffect, useRef } from 'react';
import { meldingerFilterAtom } from 'src/components/Meldinger/List/Filter';
import { useFilterMeldinger } from 'src/components/Meldinger/List/utils';

const routeApi = getRouteApi('/new/person/meldinger');

export const useSetTraadIdQueryParam = () => {
    const { traadId } = routeApi.useSearch();
    const navigate = routeApi.useNavigate();
    const filters = useAtomValue(meldingerFilterAtom);
    const filteredTraader = useFilterMeldinger();
    const prevFiltersRef = useRef(filters);

    useEffect(() => {
        if (!filteredTraader.length) return;
        const filterEndret = JSON.stringify(prevFiltersRef.current) !== JSON.stringify(filters);
        prevFiltersRef.current = filters;

        const selectedTraadFinnes = traadId && filteredTraader.some((t) => t.traadId === traadId);

        // Reset query om filteret endres og den valgte tråden ikke lenger er i listen
        if (filterEndret && traadId && !selectedTraadFinnes) {
            navigate({ search: { traadId: '' }, replace: true });
            return;
        }
        const firstTraadId = filteredTraader[0]?.traadId;
        // Velg første tråd hvis query param ikke finnes
        if (!traadId && firstTraadId) {
            navigate({ search: (prev) => ({ ...prev, traadId: firstTraadId }), replace: true });
        }
    }, [filteredTraader, filters, traadId, navigate]);
};
