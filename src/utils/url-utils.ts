import { useMemo } from 'react';
import { useLocation } from 'react-router';

export function parseQueryString<TYPE>(queryParams: string): TYPE {
    const entries = queryParams
        .replace('?', '')
        .split('&')
        .map((it) => it.split('='));
    return entries.reduce((acc, entry) => ({ ...acc, [entry[0]]: entry[1] }), {} as TYPE);
}

export function useQueryParams<TYPE>(): TYPE {
    const search = useLocation().search;

    return useMemo(() => {
        return parseQueryString<TYPE>(search);
    }, [search]);
}

export const finnMiljoStreng = () => {
    const host = window.location.host;
    const bindestrekIndex = host.indexOf('-');
    if (bindestrekIndex === -1) {
        return '';
    }
    const dotIndex = host.indexOf('.');
    return host.substring(bindestrekIndex, dotIndex);
};
