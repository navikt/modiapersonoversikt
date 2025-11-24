import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { type FetchError, post } from 'src/api/api';
import { apiBaseUri } from 'src/api/config';
import { FeatureToggles } from 'src/components/featureToggle/toggleIDs';
import useFeatureToggle from 'src/components/featureToggle/useFeatureToggle';
import type { PleiepengerResponse } from 'src/models/ytelse/pleiepenger';

export const usePleiepenger = (
    fnr: string,
    fom: string,
    tom: string
): UseQueryResult<PleiepengerResponse, FetchError> => {
    const enabled = useFeatureToggle(FeatureToggles.InfotrygdPleiepenger).isOn;
    return useQuery({
        queryKey: ['pleiepenger', fnr, fom, tom],
        queryFn: () =>
            post(`${apiBaseUri}/ytelse/pleiepenger`, {
                fnr,
                fom: fom,
                tom: tom
            }),
        enabled
    });
};
