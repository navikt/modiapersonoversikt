import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { type FetchError, post } from 'src/api/api';
import { apiBaseUri } from 'src/api/config';
import type { PeriodeDagpengerDto } from 'src/generated/modiapersonoversikt-api';

export const usePeriodeDagpengerDto = (
    fnr: string,
    fom: string,
    tom: string
): UseQueryResult<PeriodeDagpengerDto[], FetchError> => {
    return useQuery({
        queryKey: ['dagpenger', fnr, fom, tom],
        queryFn: () =>
            post(`${apiBaseUri}/ytelse/dagpenger`, {
                fnr,
                fom: fom,
                tom: tom
            })
    });
};
