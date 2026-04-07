import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { type FetchError, post } from 'src/api/api';
import { apiBaseUri } from 'src/api/config';
import type { Foreldrepenger } from 'src/generated/modiapersonoversikt-api';

export const useForeldrepenger = (
    fnr: string,
    fom: string,
    tom: string
): UseQueryResult<Foreldrepenger[], FetchError> => {
    return useQuery({
        queryKey: ['foreldrepenger', fnr, fom, tom],
        queryFn: () =>
            post(`${apiBaseUri}/ytelse/foreldrepenger`, {
                fnr,
                fom: fom,
                tom: tom
            })
    });
};
