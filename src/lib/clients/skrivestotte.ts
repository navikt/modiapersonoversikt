import { useQuery } from '@tanstack/react-query';
import { type FetchError, get } from 'src/api/api';
import type { Tekster } from 'src/lib/types/skrivestotte';

const queryKey = ['skrivestotte'];

function url(): string {
    return `${import.meta.env.BASE_URL}proxy/modia-skrivestotte/skrivestotte`;
}

export const useStandardTekster = () => {
    return useQuery<Tekster, FetchError>({
        queryKey: queryKey,
        queryFn: () => get(url())
    });
};
