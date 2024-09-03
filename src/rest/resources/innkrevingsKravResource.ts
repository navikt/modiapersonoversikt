import { apiBaseUri } from '../../api/config';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, get } from '../../api/api';
import { Innkrevingskrav } from '../../app/innkrevingskrav/Innkrevingskrav';

function url(kravId: string): string {
    return `${apiBaseUri}/innkrevingskrav/${kravId}`;
}

const resource = {
    queryKey(kravId: string | undefined) {
        return ['innkrevingskrav', kravId];
    },
    useFetch(kravId: string | undefined): UseQueryResult<Innkrevingskrav, FetchError> {
        return useQuery({
            queryKey: this.queryKey(kravId),
            queryFn: () => (kravId ? get<Innkrevingskrav>(url(kravId)) : Promise.resolve(undefined)),
            enabled: !!kravId
        });
    }
};
export default resource;
