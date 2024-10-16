import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, get } from '../../api/api';
import { Tekster } from '../../app/personside/dialogpanel/sendMelding/standardTekster/domain';

const queryKey = ['skrivestotte'];

function url(): string {
    return `${import.meta.env.BASE_URL}proxy/modia-skrivestotte/skrivestotte`;
}

const resource = {
    useFetch(): UseQueryResult<Tekster, FetchError> {
        return useQuery({
            queryKey: queryKey,
            queryFn: () => get(url())
        });
    }
};
export default resource;
