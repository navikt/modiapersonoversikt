import { apiBaseUri } from '../../api/config';
import { useFodselsnummer } from '../../utils/customHooks';
import { PleiepengerResponse } from '../../models/ytelse/pleiepenger';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, get } from '../../api/api';

function queryKey(fnr: string): [string, string] {
    return ['pleiepenger', fnr];
}

function url(fnr: string): string {
    return `${apiBaseUri}/ytelse/pleiepenger/${fnr}`;
}

const resource = {
    useFetch(): UseQueryResult<PleiepengerResponse, FetchError> {
        const fnr = useFodselsnummer();
        return useQuery(queryKey(fnr), () => get(url(fnr)));
    }
};
export default resource;
