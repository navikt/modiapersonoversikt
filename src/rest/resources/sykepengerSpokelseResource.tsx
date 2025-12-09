import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { type FetchError, post } from 'src/api/api';
import { apiBaseUri } from 'src/api/config';
import type { SykpengerVedtak } from 'src/generated/modiapersonoversikt-api';

export const useSykepengerSpokelse = (fnr: string): UseQueryResult<SykpengerVedtak[], FetchError> => {
    return useQuery({
        queryKey: ['spokelse_sykepenger', fnr],
        queryFn: () =>
            post(`${apiBaseUri}/ytelse/spokelse_sykepenger`, {
                fnr
            })
    });
};
