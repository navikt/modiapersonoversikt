import { apiBaseUri } from '../../api/config';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, post } from '../../api/api';

function queryKey(fnr: string) {
    return ['aktorid', fnr];
}

function urlUtenFnrIPath() {
    return `${apiBaseUri}/v3/person/aktorid`;
}

const resource = {
    useFetch(fnr: string): UseQueryResult<string | null, FetchError> {
        return useQuery({
            queryKey: queryKey(fnr),
            queryFn: () => post(urlUtenFnrIPath(), { fnr })
        });
    }
};
export default resource;
