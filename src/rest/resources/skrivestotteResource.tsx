import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import type { Tekster } from 'src/lib/types/skrivestotte';
import { type FetchError, get } from '../../api/api';

const queryKey = ['skrivestotte'];

function url(): string {
    return `${import.meta.env.BASE_URL}proxy/modia-skrivestotte/skrivestotte`;
}

const resource = {
    useFetch(): UseQueryResult<Tekster, FetchError> {
        return useQuery({
            queryKey: queryKey,
            queryFn: () => get(url())
        });
    }
};
export default resource;
