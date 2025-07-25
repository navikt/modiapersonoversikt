import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { type FetchError, post } from '../../api/api';
import { apiBaseUri } from '../../api/config';
import type { SykepengerResponse } from '../../models/ytelse/sykepenger';

export const useSykepenger = (
    fnr: string,
    fom: string,
    tom: string
): UseQueryResult<SykepengerResponse, FetchError> => {
    return useQuery({
        queryKey: ['sykepenger', fnr, fom, tom],
        queryFn: () =>
            post(`${apiBaseUri}/ytelse/sykepenger`, {
                fnr,
                fom: fom,
                tom: tom
            })
    });
};
