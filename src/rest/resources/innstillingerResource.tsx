import type { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { type FetchError, get, post } from '../../api/api';

export interface SaksbehandlerInnstillinger {
    sistLagret: string;
    innstillinger: Innstillinger;
}

export interface Innstillinger {
    [key: string]: string;
}

const queryKey = ['innstillinger'];
const url = `${import.meta.env.BASE_URL}proxy/modia-innstillinger/api/innstillinger`;

function fetchInnstillinger(): Promise<SaksbehandlerInnstillinger> {
    return get<SaksbehandlerInnstillinger>(url);
}
async function updateInnstillinger(innstillinger: Innstillinger): Promise<SaksbehandlerInnstillinger> {
    return post<SaksbehandlerInnstillinger>(url, innstillinger);
}

const resource = {
    useFetch(): UseQueryResult<SaksbehandlerInnstillinger, FetchError> {
        return useQuery({
            queryKey: queryKey,
            queryFn: fetchInnstillinger
        });
    },
    useInnstilling<T extends string>(key: string, defaultValue: T): T {
        const req = this.useFetch();
        if (req.isSuccess) {
            return (req.data.innstillinger[key] as T) ?? defaultValue;
        }
        return defaultValue;
    },
    useMutation(): UseMutationResult<SaksbehandlerInnstillinger, FetchError, Innstillinger> {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: updateInnstillinger,
            onSuccess(data: SaksbehandlerInnstillinger) {
                queryClient.setQueryData(queryKey, data);
            }
        });
    }
};

export default resource;
