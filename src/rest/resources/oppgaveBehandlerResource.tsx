import { type UseQueryResult, useQuery, useQueryClient } from '@tanstack/react-query';
import { type FetchError, get } from '../../api/api';
import { apiBaseUri } from '../../api/config';
import type { Enhet } from '../../models/meldinger/oppgave';

const queryKey = ['oppgavebehandlere'];
const url = `${apiBaseUri}/v2/enheter/oppgavebehandlere/alle`;

const resource = {
    usePrefetch() {
        const queryClient = useQueryClient();
        return queryClient.prefetchQuery({ queryKey, queryFn: () => get(url) });
    },
    useFetch(): UseQueryResult<Array<Enhet>, FetchError> {
        return useQuery({
            queryKey: queryKey,
            queryFn: () => get(url)
        });
    }
};
export default resource;
