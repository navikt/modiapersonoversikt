import { getRouteApi } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { useEffect, useRef } from 'react';
import { ytelseFilterAtom } from 'src/components/ytelser/List/Filter';
import { getUnikYtelseKey, useFilterYtelser, type YtelseVedtak } from 'src/components/ytelser/utils';

const routeApi = getRouteApi('/new/person/ytelser');

export const useSetIdQueryParam = (ytelser: YtelseVedtak[]) => {
    const { id } = routeApi.useSearch();
    const filterAtomValue = useAtomValue(ytelseFilterAtom);
    const prevFilterRef = useRef(ytelseFilterAtom);
    const navigate = routeApi.useNavigate();
    const { isLoading } = useFilterYtelser();

    // Fjern ytelseid i URL hvis filteret er endret og ytelsen ikke finnes i filtrerte ytelser
    useEffect(() => {
        if (isLoading) return;
        const filterEndret = JSON.stringify(prevFilterRef.current.init) !== JSON.stringify(filterAtomValue);
        const selectedYtelse = ytelser.find((item) => getUnikYtelseKey(item) === id);

        if (filterEndret && !selectedYtelse) {
            navigate({ search: { id: ytelser.length ? getUnikYtelseKey(ytelser[0]) : '' }, replace: true });
            return;
        }

        // Velg første ytelse om query param ikke finnes
        if (!id && ytelser[0]) {
            navigate({ search: { id: getUnikYtelseKey(ytelser[0]) } });
        }
    }, [id, ytelser, filterAtomValue, isLoading]);
};
