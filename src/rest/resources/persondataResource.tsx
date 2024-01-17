import { apiBaseUri } from '../../api/config';
import { useFodselsnummer } from '../../utils/customHooks';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, post } from '../../api/api';
import { Data as Persondata } from '../../app/personside/visittkort-v2/PersondataDomain';

function queryKey(fnr: string) {
    return ['persondata', fnr];
}

function url() {
    return `${apiBaseUri}/v2/person`;
}

const resource = {
    useFetch(): UseQueryResult<Persondata, FetchError> {
        const fnr = useFodselsnummer();
        return useQuery(queryKey(fnr), () => post(url(), { fnr }));
    }
};
export default resource;
