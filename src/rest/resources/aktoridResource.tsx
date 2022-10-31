import { apiBaseUri } from '../../api/config';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, get } from '../../api/api';

function queryKey(fnr: string) {
    return ['aktorid', fnr];
}
function url(fnr: String) {
    return `${apiBaseUri}/v2/person/${fnr}/aktorid`;
}

const resource = {
    useFetch(fnr: string): UseQueryResult<string | null, FetchError> {
        return useQuery(queryKey(fnr), () => get(url(fnr)));
    }
};
export default resource;
