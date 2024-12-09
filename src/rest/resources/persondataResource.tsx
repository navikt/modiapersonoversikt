import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { type FetchError, post } from '../../api/api';
import { apiBaseUri } from '../../api/config';
import type { Data as Persondata } from '../../app/personside/visittkort-v2/PersondataDomain';
import { useFodselsnummer } from '../../utils/customHooks';

function queryKey(fnr: string) {
    return ['persondata', fnr];
}

function urlUtenFnrIPath() {
    return `${apiBaseUri}/v3/person`;
}

const resource = {
    useFetch(): UseQueryResult<Persondata, FetchError> {
        const fnr = useFodselsnummer();
        return useQuery({
            queryKey: queryKey(fnr),
            queryFn: () => post(urlUtenFnrIPath(), { fnr })
        });
    }
};
export default resource;
