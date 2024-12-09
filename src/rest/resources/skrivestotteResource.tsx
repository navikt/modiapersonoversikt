import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { type FetchError, get } from '../../api/api';
import type { Tekster } from '../../app/personside/dialogpanel/sendMelding/standardTekster/domain';

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
