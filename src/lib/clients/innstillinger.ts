import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { type FetchError, get, post } from 'src/api/api';

export interface SaksbehandlerInnstillinger {
    sistLagret: string;
    innstillinger: Record<string, string>;
}

const queryKey = ['innstillinger'];

function url(): string {
    return `${import.meta.env.BASE_URL}proxy/modia-innstillinger/api/innstillinger`;
}

export const useInnstillinger = () => {
    return useQuery<SaksbehandlerInnstillinger, FetchError>({
        queryKey,
        queryFn: () => get(url())
    });
};

export const useOppdaterInnstillinger = () => {
    const queryClient = useQueryClient();

    return useMutation<SaksbehandlerInnstillinger, FetchError, Record<string, string>>({
        mutationFn: (innstillinger) => post(url(), innstillinger),
        onSuccess(data) {
            queryClient.setQueryData(queryKey, data);
        }
    });
};
