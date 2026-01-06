import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { type FetchError, post } from 'src/api/api';
import { apiBaseUri } from 'src/api/config';
import { FeatureToggles } from 'src/components/featureToggle/toggleIDs';
import useFeatureToggle from 'src/components/featureToggle/useFeatureToggle';
import type { SykepengerResponse } from 'src/models/ytelse/sykepenger';

export const useSykepenger = (
    fnr: string,
    fom: string,
    tom: string
): UseQueryResult<SykepengerResponse, FetchError> => {
    const enabled = useFeatureToggle(FeatureToggles.InfotrygdSykepenger).isOn;
    return useQuery({
        queryKey: ['sykepenger', fnr, fom, tom],
        queryFn: () =>
            post(`${apiBaseUri}/ytelse/sykepenger`, {
                fnr,
                fom: fom,
                tom: tom
            }),
        enabled
    });
};
