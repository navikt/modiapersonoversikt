import { useMutation } from '@tanstack/react-query';
import { type FetchError, post } from 'src/api/api';

interface ContextResponse {
    aktivBruker: string;
    aktivEnhet: string;
}

function url(): string {
    return `${import.meta.env.BASE_URL}proxy/modiacontextholder/api/context`;
}

export const useSetUserContext = () => {
    return useMutation<ContextResponse, FetchError, { fnr: string; verdiType: 'FNR' | 'FNR_KODE' }>({
        mutationFn: ({ fnr, verdiType }) =>
            post(url(), {
                eventType: 'NY_AKTIV_BRUKER',
                verdiType: verdiType,
                verdi: fnr
            })
    });
};
