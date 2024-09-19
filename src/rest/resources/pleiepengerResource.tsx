import { apiBaseUri } from '../../api/config';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, post } from '../../api/api';
import { useReduxData } from './tiltakspengerResource';
import { PleiepengerResponse } from '../../models/ytelse/pleiepenger';

function queryKey(fnr: string, fom?: string, tom?: string) {
    return ['pleiepenger', fnr, fom, tom];
}

function urlV2(): string {
    return `${apiBaseUri}/v2/ytelse/pleiepenger`;
}

const resource = {
    useFetch(): UseQueryResult<PleiepengerResponse, FetchError> {
        const [fnr, periode] = useReduxData();

        return useQuery({
            queryKey: queryKey(fnr),
            queryFn: (): Promise<PleiepengerResponse> =>
                post(urlV2(), {
                    fnr,
                    fom: periode.fra,
                    tom: periode.til
                })
        });
    }
};
export default resource;
