import { TiltakspengerResource } from '../../models/ytelse/tiltakspenger';
import { apiBaseUri } from '../../api/config';
import { useFodselsnummer } from '../../utils/customHooks';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, post } from '../../api/api';
import dayjs from 'dayjs';
import useFeatureToggle from '../../components/featureToggle/useFeatureToggle';
import { FeatureToggles } from '../../components/featureToggle/toggleIDs';

function queryKey(fnr: string): [string, string] {
    return ['tiltakspenger', fnr];
}

function urlV2(): string {
    return `${apiBaseUri}/v2/ytelse/tiltakspenger`;
}
const resource = {
    useFetch(): UseQueryResult<TiltakspengerResource, FetchError> {
        const fnr = useFodselsnummer();

        const tiltakspengerFeatureToggle = useFeatureToggle(FeatureToggles.BrukNyTiltakspenger);

        return useQuery({
            queryKey: queryKey(fnr),
            queryFn: () =>
                tiltakspengerFeatureToggle.isOn
                    ? post(urlV2(), {
                          fnr,
                          fom: dayjs().subtract(10, 'years').format('YYYY-MM-DD'),
                          tom: dayjs().format('YYYY-MM-DD')
                      })
                    : Promise.resolve([]),
            enabled: !tiltakspengerFeatureToggle.pending
        });
    }
};
export default resource;
