import { apiBaseUri } from '../../api/config';
import { useFodselsnummer } from '../../utils/customHooks';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, get } from '../../api/api';
import { VarslerResult } from '../../models/varsel';

function queryKey(fnr: string): [string, string] {
    return ['varsel', fnr];
}

function url(fnr: string): string {
    return `${apiBaseUri}/v2/varsler/${fnr}`;
}

const resource = {
    useFetch(): UseQueryResult<VarslerResult, FetchError> {
        const fnr = useFodselsnummer();
        return useQuery(queryKey(fnr), () => get(url(fnr)));
    }
};
export default resource;
