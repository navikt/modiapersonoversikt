import { getRouteApi, useSearch } from '@tanstack/react-router';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { dokumenterFilterAtom } from 'src/components/Dokumenter/Filter';
import { useTemaer } from 'src/components/saker/utils';

const routeApi = getRouteApi('/new/person/dokumenter');

export const useDokumenterUrlState = () => {
    const { tema, saksid, dato } = routeApi.useSearch();
    const setDokFilter = useSetAtom(dokumenterFilterAtom);

    setDokFilter((prev) => ({
        ...prev,
        temaer: teamerFraQueryParams
    }));
};

}
