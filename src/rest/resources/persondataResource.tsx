import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { usePersonAtomValue } from 'src/lib/state/context';
import { type FetchError, post } from '../../api/api';
import { apiBaseUri } from '../../api/config';
import type { Data as Persondata } from '../../app/personside/visittkort-v2/PersondataDomain';

function queryKey(fnr: string) {
    return ['persondata', fnr];
}

function urlUtenFnrIPath() {
    return `${apiBaseUri}/person`;
}

const resource = {
    useFetch(): UseQueryResult<Persondata, FetchError> {
        const fnr = usePersonAtomValue();
        return useQuery({
            queryKey: queryKey(fnr),
            queryFn: () => post(urlUtenFnrIPath(), { fnr })
        });
    }
};
export default resource;
