import { useHistory, useLocation } from 'react-router';
import { useOnMount } from '../customHooks';
import { useEffect } from 'react';

interface QueryParams {
    [name: string]: string;
}

let queryParamsStore: QueryParams = {};

export function resetKeepQueryParams() {
    queryParamsStore = {};
}

export function useKeepQueryParams() {
    const loaction = useLocation();
    const path = loaction.pathname.replace(/\//g, '');
    const queryParams = loaction.search;
    const history = useHistory();

    useOnMount(() => {
        const storedQueryParams = queryParamsStore[path];
        if (!queryParams && storedQueryParams) {
            history.replace(storedQueryParams);
        }
    });

    useEffect(() => {
        queryParamsStore[path] = queryParams;
    }, [queryParams, path]);
}
