import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { usePersonAtomValue } from 'src/lib/state/context';
import { type FetchError, post } from '../../api/api';
import { apiBaseUri } from '../../api/config';
import type { VarslerResult } from '../../models/varsel';

function queryKey(fnr: string): [string, string] {
    return ['varsel', fnr];
}

function urlV3(): string {
    return `${apiBaseUri}/varsler`;
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
