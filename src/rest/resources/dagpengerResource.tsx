import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { type FetchError, post } from 'src/api/api';
import { apiBaseUri } from 'src/api/config';
import type { PseudoDagpengerVedtak } from 'src/generated/modiapersonoversikt-api';

export const useDagpenger = (
    fnr: string,
    fom: string,
    tom: string
): UseQueryResult<PseudoDagpengerVedtak, FetchError> => {
    return useQuery({
        queryKey: ['dagpenger', fnr, fom, tom],
        queryFn: () =>
            post(`${apiBaseUri}/ytelse/dagpenger`, {
                fnr,
                fom: fom,
                tom: tom
            })
    });
};
