import { SykepengerResponse } from '../../models/ytelse/sykepenger';
import { apiBaseUri } from '../../api/config';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, post } from '../../api/api';

export const useSykepenger = (
    fnr: string,
    fom: string,
    tom: string
): UseQueryResult<SykepengerResponse, FetchError> => {
    return useQuery({
        queryKey: ['sykepenger', fnr, fom, tom],
        queryFn: () =>
            post(`${apiBaseUri}/v2/ytelse/sykepenger`, {
                fnr,
                fom: fom,
                tom: tom
            })
    });
};
