import { apiBaseUri } from '../../api/config';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, post } from '../../api/api';

function queryKey(fnr: string) {
    return ['aktorid', fnr];
}

function url() {
    return `${apiBaseUri}/v2/person/aktorid`;
}

const resource = {
    useFetch(fnr: string): UseQueryResult<string | null, FetchError> {
        return useQuery(queryKey(fnr), () => post(url(), { fnr }));
    }
};
export default resource;
