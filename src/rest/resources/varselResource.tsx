import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { type FetchError, post } from '../../api/api';
import { apiBaseUri } from '../../api/config';
import type { VarslerResult } from '../../models/varsel';
import { usePersonAtomValue } from 'src/lib/state/context';

function queryKey(fnr: string): [string, string] {
    return ['varsel', fnr];
}

function urlV3(): string {
    return `${apiBaseUri}/v3/varsler`;
}
const resource = {
    useFetch(): UseQueryResult<VarslerResult, FetchError> {
        const fnr = usePersonAtomValue();

        return useQuery({
            queryKey: queryKey(fnr),
            queryFn: () => post(urlV3(), { fnr })
        });
    }
};
export default resource;
