import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { FeatureToggles } from 'src/components/featureToggle/toggleIDs';
import useFeatureToggle from 'src/components/featureToggle/useFeatureToggle';
import { type FetchError, post } from '../../api/api';
import { apiBaseUri } from '../../api/config';
import type { TiltakspengerResource } from '../../models/ytelse/tiltakspenger';

export const useTiltakspenger = (
    fnr: string,
    fom: string,
    tom: string
): UseQueryResult<TiltakspengerResource, FetchError> => {
    const enabled = useFeatureToggle(FeatureToggles.BrukNyTiltakspenger).isOn;
    return useQuery({
        queryKey: ['tiltakspenger', fnr, fom, tom],
        queryFn: () =>
            post(`${apiBaseUri}/ytelse/tiltakspenger`, {
                fnr,
                fom,
                tom
            }),
        enabled
    });
};
