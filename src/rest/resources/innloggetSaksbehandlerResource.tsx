import { apiBaseUri } from '../../api/config';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, get } from '../../api/api';

/**
 * Kan denne kanskje erstattes av kall til modiacontextholder, og bør den evt gjøre det?
 */
const queryKey = ['innloggetsaksbehandler'];
const url = `${apiBaseUri}/hode/me`;

export interface InnloggetSaksbehandler {
    ident: string;
    navn: string;
    fornavn: string;
    etternavn: string;
}

const resource = {
    useFetch(): UseQueryResult<InnloggetSaksbehandler, FetchError> {
        return useQuery(queryKey, () => get(url));
    }
};

export default resource;
