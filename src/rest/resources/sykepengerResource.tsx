import { SykepengerResponse } from '../../models/ytelse/sykepenger';
import { apiBaseUri } from '../../api/config';
import { useFodselsnummer } from '../../utils/customHooks';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, post } from '../../api/api';

function queryKey(fnr: string): [string, string] {
    return ['sykepenger', fnr];
}

function urlV2(): string {
    return `${apiBaseUri}/v2/ytelse/sykepenger`;
}
const resource = {
    useFetch(): UseQueryResult<SykepengerResponse, FetchError> {
        const fnr = useFodselsnummer();

        return useQuery(queryKey(fnr), () => post(urlV2(), { fnr }));
    }
};
export default resource;
