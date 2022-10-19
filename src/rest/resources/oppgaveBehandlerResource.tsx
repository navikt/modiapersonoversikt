import { apiBaseUri } from '../../api/config';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, get } from '../../api/api';
import { Enhet } from '../../models/meldinger/oppgave';

const queryKey = ['oppgavebehandlere'];
const url = `${apiBaseUri}/enheter/oppgavebehandlere/alle`;

const resource = {
    useFetch(): UseQueryResult<Array<Enhet>, FetchError> {
        return useQuery(queryKey, () => get(url), { initialData: [] });
    }
};
export default resource;
