import { apiBaseUri } from '../../api/config';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, get, post } from '../../api/api';
import useFeatureToggle from '../../components/featureToggle/useFeatureToggle';
import { FeatureToggles } from '../../components/featureToggle/toggleIDs';

function queryKey(fnr: string) {
    return ['aktorid', fnr];
}
function url(fnr: String) {
    return `${apiBaseUri}/v2/person/${fnr}/aktorid`;
}

function urlUtenFnrIPath() {
    return `${apiBaseUri}/v3/person/aktorid`;
}

const resource = {
    useFetch(fnr: string): UseQueryResult<string | null, FetchError> {
        const { isOn } = useFeatureToggle(FeatureToggles.IkkeFnrIPath);

        return useQuery(queryKey(fnr), () => (isOn ? post(urlUtenFnrIPath(), { fnr }) : get(url(fnr))));
    }
};
export default resource;
