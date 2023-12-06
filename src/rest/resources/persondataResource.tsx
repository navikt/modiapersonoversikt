import { apiBaseUri } from '../../api/config';
import { useFodselsnummer } from '../../utils/customHooks';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, get, post } from '../../api/api';
import { Data as Persondata } from '../../app/personside/visittkort-v2/PersondataDomain';
import useFeatureToggle from '../../components/featureToggle/useFeatureToggle';
import { FeatureToggles } from '../../components/featureToggle/toggleIDs';

function queryKey(fnr: string) {
    return ['persondata', fnr];
}
function url(fnr: String) {
    return `${apiBaseUri}/v2/person/${fnr}`;
}

function urlUtenFnrIPath() {
    return `${apiBaseUri}/v2/person`;
}

const resource = {
    useFetch(): UseQueryResult<Persondata, FetchError> {
        const fnr = useFodselsnummer();
        const { isOn } = useFeatureToggle(FeatureToggles.IkkeFnrIPath);
        return useQuery(queryKey(fnr), () => (isOn ? post(urlUtenFnrIPath(), { fnr }) : get(url(fnr))));
    }
};
export default resource;
