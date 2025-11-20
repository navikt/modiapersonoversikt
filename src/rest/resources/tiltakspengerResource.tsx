import { type UseQueryResult, useQuery } from '@tanstack/react-query';

import { type FetchError, post } from '../../api/api';
import { apiBaseUri } from '../../api/config';
import type { TiltakspengerResource } from '../../models/ytelse/tiltakspenger';

export const useTiltakspenger = (
    fnr: string,
    fom: string,
    tom: string
): UseQueryResult<TiltakspengerResource, FetchError> => {
    return useQuery({
        queryKey: ['tiltakspenger', fnr, fom, tom],
        queryFn: () =>
            post(`${apiBaseUri}/ytelse/tiltakspenger`, {
                fnr,
                fom,
                tom
            })
    });
};
