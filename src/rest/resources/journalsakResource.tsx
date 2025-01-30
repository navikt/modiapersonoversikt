import { type UseQueryResult, useQuery, useQueryClient } from '@tanstack/react-query';
import { usePersonAtomValue } from 'src/lib/state/context';
import { type FetchError, post } from '../../api/api';
import { apiBaseUri } from '../../api/config';
import type { Result } from '../../app/personside/infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';

function urlV2(): string {
    return `${apiBaseUri}/v2/journalforing/saker/`;
}

const resource = {
    queryKey(fnr: string) {
        return ['journalsak', fnr];
    },
    usePrefetch() {
        const fnr = usePersonAtomValue();
        const queryClient = useQueryClient();
        queryClient.prefetchQuery({ queryKey: this.queryKey(fnr), queryFn: () => post(urlV2(), { fnr }) });
    },
    useFetch(): UseQueryResult<Result, FetchError> {
        const fnr = usePersonAtomValue();
        return useQuery({
            queryKey: this.queryKey(fnr),
            queryFn: () => post(urlV2(), { fnr })
        });
    }
};
export default resource;
