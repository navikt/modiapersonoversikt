import { apiBaseUri } from '../../api/config';
import { useFodselsnummer } from '../../utils/customHooks';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, post } from '../../api/api';
import { VarslerResult } from '../../models/varsel';

function queryKey(fnr: string): [string, string] {
    return ['varsel', fnr];
}

function urlV3(): string {
    return `${apiBaseUri}/v3/varsler`;
}
const resource = {
    useFetch(): UseQueryResult<VarslerResult, FetchError> {
        const fnr = useFodselsnummer();

        return useQuery({
            queryKey: queryKey(fnr),
            queryFn: () => post(urlV3(), { fnr })
        });
    }
};
export default resource;
