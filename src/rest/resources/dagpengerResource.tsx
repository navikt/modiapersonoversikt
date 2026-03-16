import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { type FetchError, post } from 'src/api/api';
import { apiBaseUri } from 'src/api/config';
import type { PseudoDagpengerVedtak } from 'src/generated/modiapersonoversikt-api';

/**
 * does _not_ pass an FnrDatoRangeRequest, but a DatadelingRequestDagpengerDto,
 * which has the same rough shape.
 */
export const useDagpenger = (
    fnr: string,
    fom: string,
    tom: string
): UseQueryResult<PseudoDagpengerVedtak, FetchError> => {
    return useQuery({
        queryKey: ['dagpenger', fnr, fom, tom],
        queryFn: () =>
            post(`${apiBaseUri}/ytelse/dagpenger`, {
                fnr,
                fraOgMedDato: fom,
                tilOgMedDato: tom
            })
    });
};
