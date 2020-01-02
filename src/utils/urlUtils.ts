import { useMemo } from 'react';
import { useLocation } from 'react-router';

export function useQueryParams<Type>(): Type {
    const search = useLocation().search;

    return useMemo(() => {
        const entries = search
            .replace('?', '')
            .split('&')
            .map(it => it.split('='));
        return entries.reduce((acc, entry) => ({ ...acc, [entry[0]]: entry[1] }), {} as Type);
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
