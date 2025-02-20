import { useAtomValue } from 'jotai';
import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';
import { FetchError } from 'src/api/api';
import { apiBaseUriWithoutRest } from 'src/api/config';
import type { paths } from 'src/generated/modiapersonoversikt-api';
import { aktivEnhetAtom, usePersonAtomValue } from 'src/lib/state/context';

export type ModiapersonoversiktAPI = paths;

export const personoversiktApiClient = createFetchClient<paths>({
    baseUrl: apiBaseUriWithoutRest,
    credentials: 'include',
    mode: 'cors',
    redirect: 'follow',
    headers: {
        'content-type': 'application/json'
    }
});

type APIError = {
    message?: string;
};

personoversiktApiClient.use({
    onResponse: async ({ response }) => {
        if (!response.ok) {
            let errText = undefined;
            try {
                const apiErr = (await response.json()) as APIError;
                if (apiErr.message) {
                    errText = apiErr.message;
                }
            } catch {
                // Use default error text
            }
            throw new FetchError(response, errText, response.headers.get('traceid') ?? undefined);
        }
    }
});

export const $api = createClient(personoversiktApiClient);

export const usePersonData = () => {
    const aktivBruker = usePersonAtomValue();
    return $api.useSuspenseQuery('post', '/rest/v3/person', {
        body: { fnr: aktivBruker }
    });
};

export const useVarslerData = () => {
    const aktivBruker = usePersonAtomValue();
    return $api.useSuspenseQuery('post', '/rest/v3/varsler', {
        body: { fnr: aktivBruker }
    });
};

export const useBaseUrls = () => {
    return $api.useQuery('get', '/rest/baseurls/v2');
};

export const useSendMelding = () => {
    return $api.useMutation('post', '/rest/v2/dialog/sendmelding');
};

export const useEnheter = () => {
    return $api.useQuery('get', '/rest/hode/enheter');
};

export const useJournalforingSaker = () => {
    const aktivBruker = usePersonAtomValue();
    return $api.useQuery('post', '/rest/v2/journalforing/saker/', {
        body: { fnr: aktivBruker }
    });
};

export const usePersonOppgaver = () => {
    const aktivBruker = usePersonAtomValue();

    return $api.useSuspenseQuery('post', '/rest/v2/oppgaver/tildelt', {
        body: {
            fnr: aktivBruker
        }
    });
};

export const useMeldinger = () => {
    const fnr = usePersonAtomValue();
    const enhet = useAtomValue(aktivEnhetAtom) as string;

    return $api.useSuspenseQuery('post', '/rest/v2/dialog/meldinger', {
        body: { fnr },
        params: { query: { enhet } }
    });
};
