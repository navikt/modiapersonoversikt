import { apiBaseUri } from '../../api/config';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, post } from '../../api/api';
import { PleiepengerResponse } from '../../models/ytelse/pleiepenger';

export const usePleiepenger = (
    fnr: string,
    fom: string,
    tom: string
): UseQueryResult<PleiepengerResponse, FetchError> => {
    return useQuery({
        queryKey: ['pleiepenger', fnr, fom, tom],
        queryFn: () =>
            post(`${apiBaseUri}/v2/ytelse/pleiepenger`, {
                fnr,
                fom: fom,
                tom: tom
            })
    });
};
