import { apiBaseUri } from '../../api/config';
import { useFodselsnummer } from '../../utils/customHooks';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, get, post } from '../../api/api';
import { VarslerResult } from '../../models/varsel';
import useFeatureToggle from '../../components/featureToggle/useFeatureToggle';
import { FeatureToggles } from '../../components/featureToggle/toggleIDs';

function queryKey(fnr: string): [string, string] {
    return ['varsel', fnr];
}

function url(fnr: string): string {
    return `${apiBaseUri}/v2/varsler/${fnr}`;
}

function urlV3(): string {
    return `${apiBaseUri}/v3/varsler`;
}
const resource = {
    useFetch(): UseQueryResult<VarslerResult, FetchError> {
        const fnr = useFodselsnummer();
        const { isOn } = useFeatureToggle(FeatureToggles.IkkeFnrIPath);

        return useQuery(queryKey(fnr), () => (isOn ? post(urlV3(), { fnr }) : get(url(fnr))));
    }
};
export default resource;
