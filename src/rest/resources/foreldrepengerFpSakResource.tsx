import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { type FetchError, post } from 'src/api/api';
import { apiBaseUri } from 'src/api/config';
import type { ForeldrepengerFpSak } from 'src/generated/modiapersonoversikt-api';

export const useForeldrepengerFpSak = (
    fnr: string,
    fom: string,
    tom: string
): UseQueryResult<ForeldrepengerFpSak[], FetchError> => {
    return useQuery({
        queryKey: ['foreldrepenger_fpsak', fnr, fom, tom],
        queryFn: () =>
            post(`${apiBaseUri}/ytelse/foreldrepenger_fpsak`, {
                fnr,
                fom: fom,
                tom: tom
            })
    });
};
