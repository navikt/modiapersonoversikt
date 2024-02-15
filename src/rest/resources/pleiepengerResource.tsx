import { apiBaseUri } from '../../api/config';
import { useFodselsnummer } from '../../utils/customHooks';
import { PleiepengerResponse } from '../../models/ytelse/pleiepenger';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, post } from '../../api/api';

function queryKey(fnr: string): [string, string] {
    return ['pleiepenger', fnr];
}

function urlV2(): string {
    return `${apiBaseUri}/v2/ytelse/pleiepenger`;
}

const resource = {
    useFetch(): UseQueryResult<PleiepengerResponse, FetchError> {
        const fnr = useFodselsnummer();

        return useQuery(queryKey(fnr), () => post(urlV2(), { fnr }));
    }
};
export default resource;
