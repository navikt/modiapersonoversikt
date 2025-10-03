import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { type FetchError, post } from 'src/api/api';
import { apiBaseUri } from 'src/api/config';
import type { ArbeidsavklaringspengerResponse } from 'src/models/ytelse/arbeidsavklaringspenger';

export const useArbeidsavklaringspenger = (
    fnr: string,
    fom: string,
    tom: string
): UseQueryResult<ArbeidsavklaringspengerResponse, FetchError> => {
    return useQuery({
        queryKey: ['arbeidsavklaringspenger', fnr, fom, tom],
        queryFn: () =>
            post(`${apiBaseUri}/ytelse/arbeidsavklaringspenger`, {
                fnr,
                fom: fom,
                tom: tom
            })
    });
};
