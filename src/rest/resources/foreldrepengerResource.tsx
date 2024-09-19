import { apiBaseUri } from '../../api/config';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, post } from '../../api/api';
import { useReduxData } from './tiltakspengerResource';
import { ForeldrepengerResponse } from '../../models/ytelse/foreldrepenger';

export function foreldrepengerKey(fnr: string): [string, string] {
    return ['foreldrepenger', fnr];
}

function urlV2(): string {
    return `${apiBaseUri}/v2/ytelse/foreldrepenger`;
}
const resource = {
    useFetch(): UseQueryResult<ForeldrepengerResponse, FetchError> {
        const [fnr, periode] = useReduxData();

        return useQuery({
            queryKey: foreldrepengerKey(fnr),
            queryFn: () =>
                post(urlV2(), {
                    fnr,
                    fom: periode.fra,
                    tom: periode.til
                })
        });
    }
};
export default resource;
