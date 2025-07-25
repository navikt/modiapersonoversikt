import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { type FetchError, post } from '../../api/api';
import { apiBaseUri } from '../../api/config';
import type { PleiepengerResponse } from '../../models/ytelse/pleiepenger';

export const usePleiepenger = (
    fnr: string,
    fom: string,
    tom: string
): UseQueryResult<PleiepengerResponse, FetchError> => {
    return useQuery({
        queryKey: ['pleiepenger', fnr, fom, tom],
        queryFn: () =>
            post(`${apiBaseUri}/ytelse/pleiepenger`, {
                fnr,
                fom: fom,
                tom: tom
            })
    });
};
