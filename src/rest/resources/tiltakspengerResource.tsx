import { TiltakspengerResource } from '../../models/ytelse/tiltakspenger';
import { apiBaseUri } from '../../api/config';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, post } from '../../api/api';
import useFeatureToggle from 'src/components/featureToggle/useFeatureToggle';
import { FeatureToggles } from 'src/components/featureToggle/toggleIDs';

export const useTiltakspenger = (
    fnr: string,
    fom: string,
    tom: string
): UseQueryResult<TiltakspengerResource, FetchError> => {
    const enabled = useFeatureToggle(FeatureToggles.BrukNyTiltakspenger).isOn;
    return useQuery({
        queryKey: ['tiltakspenger', fnr, fom, tom],
        queryFn: () =>
            post(`${apiBaseUri}/v2/ytelse/tiltakspenger`, {
                fnr,
                fom,
                tom
            }),
        enabled
    });
};
