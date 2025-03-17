import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { type FetchError, post } from 'src/api/api';
import { apiBaseUri } from 'src/api/config';
import { usePersonAtomValue } from 'src/lib/state/context';
import type { Gjeldende14aVedtakResponse } from 'src/models/oppfolging';

const resource = {
    useFetch(): UseQueryResult<Gjeldende14aVedtakResponse, FetchError> {
        const fnr = usePersonAtomValue();
        return useQuery({
            queryKey: ['gjeldende14AVedtak', fnr],
            queryFn: () => post(`${apiBaseUri}/v2/oppfolging/hent-gjeldende-14a-vedtak`, { fnr })
        });
    }
};

export default resource;
