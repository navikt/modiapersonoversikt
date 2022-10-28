import { apiBaseUri } from '../../api/config';
import { useFodselsnummer } from '../../utils/customHooks';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, get } from '../../api/api';
import { Data as Persondata } from '../../app/personside/visittkort-v2/PersondataDomain';

function queryKey(fnr: string) {
    return ['persondata', fnr];
}
function url(fnr: String) {
    return `${apiBaseUri}/v2/person/${fnr}`;
}

const resource = {
    useFetch(): UseQueryResult<Persondata, FetchError> {
        const fnr = useFodselsnummer();
        return useQuery(queryKey(fnr), () => get(url(fnr)));
    }
};
export default resource;
