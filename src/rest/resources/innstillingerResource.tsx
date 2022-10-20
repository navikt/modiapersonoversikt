import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { get, post } from '../../api/api';
import { UseMutationResult, UseQueryResult } from '@tanstack/react-query/src/types';

export interface SaksbehandlerInnstillinger {
    sistLagret: string;
    innstillinger: Innstillinger;
}

export interface Innstillinger {
    [key: string]: string;
}

const queryKey = ['innstillinger'];
const url = '/modiapersonoversikt/proxy/modia-innstillinger/api/innstillinger';

function fetchInnstillinger(): Promise<SaksbehandlerInnstillinger> {
    return get<SaksbehandlerInnstillinger>(url);
}
async function updateInnstillinger(innstillinger: Innstillinger): Promise<SaksbehandlerInnstillinger> {
    return post<SaksbehandlerInnstillinger>(url, innstillinger);
}

const resource = {
    useFetch(): UseQueryResult<SaksbehandlerInnstillinger, Error> {
        return useQuery(queryKey, fetchInnstillinger);
    },
    useInnstilling<T extends string>(key: string, defaultValue: T): T {
        const req = this.useFetch();
        if (req.isSuccess) {
            return (req.data.innstillinger[key] as T) ?? defaultValue;
        }
        return defaultValue;
    },
    useMutation(): UseMutationResult<SaksbehandlerInnstillinger, Error, Innstillinger> {
        const queryClient = useQueryClient();
        return useMutation(updateInnstillinger, {
            onSuccess(data: SaksbehandlerInnstillinger) {
                queryClient.setQueryData(queryKey, data);
            }
        });
    }
};

export default resource;
