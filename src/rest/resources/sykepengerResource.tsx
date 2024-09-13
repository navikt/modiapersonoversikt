import { SykepengerResponse } from '../../models/ytelse/sykepenger';
import { apiBaseUri } from '../../api/config';
import { useFodselsnummer } from '../../utils/customHooks';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, post } from '../../api/api';
import {useReduxData} from "./tiltakspengerResource";

function queryKey(fnr: string): [string, string] {
    return ['sykepenger', fnr];
}

function urlV2(): string {
    return `${apiBaseUri}/v2/ytelse/sykepenger`;
}
const resource = {
    useFetch(limit30Dager: boolean = false): UseQueryResult<SykepengerResponse, FetchError> {
        const [fnr, periode] = useReduxData(limit30Dager);

        return useQuery({
            queryKey: queryKey(fnr),
            queryFn: () => post(urlV2(), {
                fnr,
                fom: periode.fra,
                tom: periode.til
            })
        });
    }
};
export default resource;
