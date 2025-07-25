import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { type FetchError, post } from '../../api/api';
import { apiBaseUri } from '../../api/config';

function queryKey(fnr: string) {
    return ['aktorid', fnr];
}

function urlUtenFnrIPath() {
    return `${apiBaseUri}/person/aktorid`;
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
