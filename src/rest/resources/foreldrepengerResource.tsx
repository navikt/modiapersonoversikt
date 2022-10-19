import { apiBaseUri } from '../../api/config';
import { useFodselsnummer } from '../../utils/customHooks';
import { ForeldrepengerResponse } from '../../models/ytelse/foreldrepenger';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, get } from '../../api/api';

function queryKey(fnr: string): [string, string] {
    return ['foreldrepenger', fnr];
}
function url(fnr: string): string {
    return `${apiBaseUri}/ytelse/foreldrepenger/${fnr}`;
}

const resource = {
    useFetch(): UseQueryResult<ForeldrepengerResponse, FetchError> {
        const fnr = useFodselsnummer();
        return useQuery(queryKey(fnr), () => get(url(fnr)));
    }
};
export default resource;
