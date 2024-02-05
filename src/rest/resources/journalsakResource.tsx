import { apiBaseUri } from '../../api/config';
import { useFodselsnummer } from '../../utils/customHooks';
import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { FetchError, get, post } from '../../api/api';
import { Result } from '../../app/personside/infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import useFeatureToggle from '../../components/featureToggle/useFeatureToggle';
import { FeatureToggles } from '../../components/featureToggle/toggleIDs';

function url(fnr: string): string {
    return `${apiBaseUri}/journalforing/${fnr}/saker/`;
}

function urlV2(): string {
    return `${apiBaseUri}/v2/journalforing/saker/`;
}

const resource = {
    queryKey(fnr: string) {
        return ['journalsak', fnr];
    },
    usePrefetch() {
        const fnr = useFodselsnummer();
        const queryClient = useQueryClient();
        const { isOn } = useFeatureToggle(FeatureToggles.IkkeFnrIPath);
        queryClient.prefetchQuery(this.queryKey(fnr), () => (isOn ? post(urlV2(), { fnr }) : get(url(fnr))));
    },
    useFetch(): UseQueryResult<Result, FetchError> {
        const fnr = useFodselsnummer();
        return useQuery(this.queryKey(fnr), () => get(url(fnr)));
    }
};
export default resource;
