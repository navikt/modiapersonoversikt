import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { type FetchError, post } from 'src/api/api';
import { apiBaseUri } from 'src/api/config';
import { FeatureToggles } from 'src/components/featureToggle/toggleIDs';
import useFeatureToggle from 'src/components/featureToggle/useFeatureToggle';
import type { Utbetalingsperioder } from 'src/generated/modiapersonoversikt-api';

export const useSykepengerSpokelse = (
    fnr: string,
    fom: string,
    tom: string
): UseQueryResult<Utbetalingsperioder, FetchError> => {
    const { isOn } = useFeatureToggle(FeatureToggles.SpokelseSykepenger);
    return useQuery({
        queryKey: ['spokelse_sykepenger', fnr, fom, tom],
        queryFn: () =>
            post(`${apiBaseUri}/ytelse/spokelse_sykepenger`, {
                fnr,
                fom: fom,
                tom: tom
            }),
        enabled: isOn
    });
};
