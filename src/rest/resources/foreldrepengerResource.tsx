import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { type FetchError, post } from '../../api/api';
import { apiBaseUri } from '../../api/config';
import type { ForeldrepengerResponse } from '../../models/ytelse/foreldrepenger';

export const useForeldrepenger = (
    fnr: string,
    fom: string,
    tom: string
): UseQueryResult<ForeldrepengerResponse, FetchError> => {
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
