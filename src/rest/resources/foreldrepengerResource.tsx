import { apiBaseUri } from '../../api/config';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, post } from '../../api/api';
import { ForeldrepengerResponse } from '../../models/ytelse/foreldrepenger';

export const useForeldrepenger = (
    fnr: string,
    fom: string,
    tom: string
): UseQueryResult<ForeldrepengerResponse, FetchError> => {
    return useQuery({
        queryKey: ['foreldrepenger', fnr, fom, tom],
        queryFn: () =>
            post(`${apiBaseUri}/v2/ytelse/foreldrepenger`, {
                fnr,
                fom: fom,
                tom: tom
            })
    });
};
