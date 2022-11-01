import { apiBaseUri } from '../../api/config';
import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { FetchError, get } from '../../api/api';
import { Enhet } from '../../models/meldinger/oppgave';

const queryKey = ['oppgavebehandlere'];
const url = `${apiBaseUri}/enheter/oppgavebehandlere/alle`;

const resource = {
    usePrefetch() {
        const queryClient = useQueryClient();
        queryClient.prefetchQuery(queryKey, () => get(url));
    },
    useFetch(): UseQueryResult<Array<Enhet>, FetchError> {
        return useQuery(queryKey, () => get(url));
    }
};
export default resource;
