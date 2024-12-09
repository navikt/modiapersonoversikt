import { type UseQueryResult, useQuery, useQueryClient } from '@tanstack/react-query';
import { type FetchError, get } from '../../api/api';
import { apiBaseUri } from '../../api/config';

/**
 * Kan denne kanskje erstattes av kall til modiacontextholder, og bør den evt gjøre det?
 */
const queryKey = ['innloggetsaksbehandler'];
const url = `${apiBaseUri}/hode/me`;

export interface InnloggetSaksbehandler {
    ident: string;
    navn: string;
    fornavn: string;
    etternavn: string;
}

const resource = {
    usePrefetch() {
        const queryClient = useQueryClient();
        return queryClient.prefetchQuery({
            queryKey,
            queryFn: () => get(url)
        });
    },
    useFetch(): UseQueryResult<InnloggetSaksbehandler, FetchError> {
        return useQuery({
            queryKey: queryKey,
            queryFn: () => get(url)
        });
    }
};

export default resource;
