import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { type FetchError, post } from 'src/api/api';
import { apiBaseUri } from 'src/api/config';
import { FeatureToggles } from 'src/components/featureToggle/toggleIDs';
import useFeatureToggle from 'src/components/featureToggle/useFeatureToggle';
import type { ForeldrepengerResponse } from 'src/models/ytelse/foreldrepenger';

export const useForeldrepenger = (
    fnr: string,
    fom: string,
    tom: string
): UseQueryResult<ForeldrepengerResponse, FetchError> => {
    const enabled = useFeatureToggle(FeatureToggles.InfotrygdForeldrepenger).isOn;

    return useQuery({
        queryKey: ['foreldrepenger', fnr, fom, tom],
        queryFn: () =>
            post(`${apiBaseUri}/ytelse/foreldrepenger`, {
                fnr,
                fom: fom,
                tom: tom
            }),
        enabled
    });
};
