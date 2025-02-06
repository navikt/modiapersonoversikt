import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { type FetchError } from 'src/api/api';
import { FeatureToggles } from 'src/components/featureToggle/toggleIDs';
import useFeatureToggle from 'src/components/featureToggle/useFeatureToggle';
import type { PensjonResource } from 'src/models/ytelse/pensjon';
import { type FetchError, post } from '../../api/api';
import { apiBaseUri } from '../../api/config';

export const usePensjon = (fnr: string, fom: string, tom: string): UseQueryResult<PensjonResource, FetchError> => {
    const enabled = useFeatureToggle(FeatureToggles.BrukPensjon).isOn;
    return useQuery({
        queryKey: ['pensjon', fnr, fom, tom],
        queryFn: () =>
            post(`${apiBaseUri}/v2/ytelse/pensjon`, {
                fnr,
                fom,
                tom
            }),
        enabled
    });
};
