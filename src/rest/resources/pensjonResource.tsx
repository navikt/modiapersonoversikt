import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { type FetchError, post } from 'src/api/api';
import { apiBaseUri } from 'src/api/config';
import type { PensjonResource } from 'src/models/ytelse/pensjon';

export const usePensjon = (fnr: string, fom: string, tom: string): UseQueryResult<PensjonResource, FetchError> => {
    return useQuery({
        queryKey: ['pensjon', fnr, fom, tom],
        queryFn: () =>
            post(`${apiBaseUri}/ytelse/pensjon`, {
                fnr,
                fom,
                tom
            })
    });
};
