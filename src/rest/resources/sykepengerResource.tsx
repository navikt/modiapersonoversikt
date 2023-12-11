import { SykepengerResponse } from '../../models/ytelse/sykepenger';
import { apiBaseUri } from '../../api/config';
import { useFodselsnummer } from '../../utils/customHooks';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, get, post } from '../../api/api';
import useFeatureToggle from '../../components/featureToggle/useFeatureToggle';
import { FeatureToggles } from '../../components/featureToggle/toggleIDs';

function queryKey(fnr: string): [string, string] {
    return ['sykepenger', fnr];
}
function url(fnr: string): string {
    return `${apiBaseUri}/ytelse/sykepenger/${fnr}`;
}

function urlV2(): string {
    return `${apiBaseUri}/v2/ytelse/sykepenger`;
}
const resource = {
    useFetch(): UseQueryResult<SykepengerResponse, FetchError> {
        const fnr = useFodselsnummer();

        const { isOn } = useFeatureToggle(FeatureToggles.IkkeFnrIPath);

        return useQuery(queryKey(fnr), () => (isOn ? post(urlV2(), { fnr }) : get(url(fnr))));
    }
};
export default resource;
