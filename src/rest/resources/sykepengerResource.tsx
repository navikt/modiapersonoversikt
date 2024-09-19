import { SykepengerResponse } from '../../models/ytelse/sykepenger';
import { apiBaseUri } from '../../api/config';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, post } from '../../api/api';
import { useReduxData } from './tiltakspengerResource';

function queryKey(fnr: string, fom?: string, tom?: string) {
    return ['sykepenger', fnr, fom, tom];
}

function urlV2(): string {
    return `${apiBaseUri}/v2/ytelse/sykepenger`;
}
const resource = {
    useFetch(): UseQueryResult<SykepengerResponse, FetchError> {
        const [fnr, periode] = useReduxData();

        return useQuery({
            queryKey: queryKey(fnr),
            queryFn: (): Promise<SykepengerResponse> =>
                post(urlV2(), {
                    fnr,
                    fom: periode.fra,
                    tom: periode.til
                })
        });
    }
};
export default resource;
