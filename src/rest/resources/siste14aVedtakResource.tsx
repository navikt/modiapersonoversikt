import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { type FetchError, post } from 'src/api/api';
import { apiBaseUri } from 'src/api/config';
import { usePersonAtomValue } from 'src/lib/state/context';
import type { Siste14aVedtakResponse } from 'src/models/oppfolging';

const resource = {
    useFetch(): UseQueryResult<Siste14aVedtakResponse, FetchError> {
        const fnr = usePersonAtomValue();
        return useQuery({
            queryKey: ['siste14AVedtak', fnr],
            queryFn: () => post(`${apiBaseUri}/v2/oppfolging/siste14AVedtak`, { fnr })
        });
    }
};

export default resource;
