import { apiBaseUri } from '../../api/config';
import { useFodselsnummer } from '../../utils/customHooks';
import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { FetchError, post } from '../../api/api';
import { Result } from '../../app/personside/infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';

function urlV2(): string {
    return `${apiBaseUri}/v2/journalforing/saker/`;
}

const resource = {
    queryKey(fnr: string) {
        return ['journalsak', fnr];
    },
    usePrefetch() {
        const fnr = useFodselsnummer();
        const queryClient = useQueryClient();
        queryClient.prefetchQuery({ queryKey: this.queryKey(fnr), queryFn: () => post(urlV2(), { fnr }) });
    },
    useFetch(): UseQueryResult<Result, FetchError> {
        const fnr = useFodselsnummer();
        return useQuery({
            queryKey: this.queryKey(fnr),
            queryFn: () => post(urlV2(), { fnr })
        });
    }
};
export default resource;
