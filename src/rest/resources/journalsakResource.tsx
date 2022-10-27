import { apiBaseUri } from '../../api/config';
import { useFodselsnummer } from '../../utils/customHooks';
import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { FetchError, get } from '../../api/api';
import { Result } from '../../app/personside/infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';

function url(fnr: string): string {
    return `${apiBaseUri}/journalforing/${fnr}/saker/`;
}

const resource = {
    queryKey(fnr: string) {
        return ['journalsak', fnr];
    },
    usePrefetch() {
        const fnr = useFodselsnummer();
        const queryClient = useQueryClient();
        queryClient.prefetchQuery(this.queryKey(fnr), () => get(url(fnr)));
    },
    useFetch(): UseQueryResult<Result, FetchError> {
        const fnr = useFodselsnummer();
        return useQuery(this.queryKey(fnr), () => get(url(fnr)));
    }
};
export default resource;
