import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';
import { FetchError } from 'src/api/api';
import { apiBaseUriWithoutRest } from 'src/api/config';
import { toast } from 'src/components/toasts';
import type { paths } from 'src/generated/modiapersonoversikt-api';
import { aktivEnhetAtom, usePersonAtomValue } from 'src/lib/state/context';

export type ModiapersonoversiktAPI = paths;

const personoversiktApiClient = createFetchClient<paths>({
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
    const queryClient = useQueryClient();
    const fnr = usePersonAtomValue();
    const enhet = useAtomValue(aktivEnhetAtom) as string;

    return $api.useMutation('post', '/rest/v2/dialog/sendmelding', {
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: $api.queryOptions('post', '/rest/v2/dialog/meldinger', {
                    body: { fnr },
                    params: { query: { enhet } }
                }).queryKey
            });
            toast.success('Melding sendt');
        },
        onError: () => {
            toast.error('Kunne ikke sende melding');
        }
    });
};

export const useJournalforMutation = () => {
    const queryClient = useQueryClient();
    const fnr = usePersonAtomValue();
    const enhet = useAtomValue(aktivEnhetAtom) as string;

    return $api.useMutation('post', '/rest/v2/journalforing/{traadId}', {
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: $api.queryOptions('post', '/rest/v2/dialog/meldinger', {
                    body: { fnr },
                    params: { query: { enhet } }
                }).queryKey
            });
            toast.success('Tråden ble journalført');
        },
        onError: () => {
            toast.error('Kunne ikke journalføre tråden');
        }
    });
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

export const useOppgaveForTraad = (traadId: string) => {
    const aktivBruker = usePersonAtomValue();

    const { data: oppgaver } = $api.useSuspenseQuery('post', '/rest/v2/oppgaver/tildelt', {
        body: {
            fnr: aktivBruker
        }
    });

    const oppgave = oppgaver.find((oppgave) => oppgave.traadId === traadId);
    const erSTOOppgave = !!oppgave?.erSTOOppgave;

    return { oppgave, erSTOOppgave };
};

export const useMeldinger = () => {
    const fnr = usePersonAtomValue();
    const enhet = useAtomValue(aktivEnhetAtom) as string;

    return $api.useSuspenseQuery('post', '/rest/v2/dialog/meldinger', {
        body: { fnr },
        params: { query: { enhet } }
    });
};

export const useTraadById = (traadId: string) => {
    const fnr = usePersonAtomValue();
    const enhet = useAtomValue(aktivEnhetAtom) ?? '';
    const { data: traader } = $api.useSuspenseQuery('post', '/rest/v2/dialog/meldinger', {
        body: { fnr },
        params: { query: { enhet } }
    });

    const traad = traader.find((t) => t.traadId === traadId);

    return traad;
};

export const useInnloggetSaksbehandler = () => {
    return $api.useSuspenseQuery('get', '/rest/hode/me');
};

export const useSladdeAarsaker = (traadId: string) => {
    return $api.useSuspenseQuery('get', '/rest/dialogmerking/sladdearsaker/{kjedeid}', {
        params: { path: { kjedeid: traadId } }
    });
};

export const useSendTilSladdingMutation = () => {
    const queryClient = useQueryClient();
    const fnr = usePersonAtomValue();
    const enhet = useAtomValue(aktivEnhetAtom) as string;

    return $api.useMutation('post', '/rest/dialogmerking/sladding', {
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: $api.queryOptions('post', '/rest/v2/dialog/meldinger', {
                    body: { fnr },
                    params: { query: { enhet } }
                }).queryKey
            });
            toast.success('Meldingene ble sendt til sladding');
        },
        onError: () => {
            toast.error('Kunne ikke sende til sladding');
        }
    });
};

export const useMarkerFeilsendtMutation = () => {
    const queryClient = useQueryClient();
    const fnr = usePersonAtomValue();
    const enhet = useAtomValue(aktivEnhetAtom) as string;

    return $api.useMutation('post', '/rest/dialogmerking/feilsendt', {
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: $api.queryOptions('post', '/rest/v2/dialog/meldinger', {
                    body: { fnr },
                    params: { query: { enhet } }
                }).queryKey
            });
            toast.success('Tråden ble markert som feilsent');
        },
        onError: () => {
            toast.error('Kunne ikke avslutte dialogen');
        }
    });
};

export const useAvsluttDialogMutation = () => {
    const queryClient = useQueryClient();
    const fnr = usePersonAtomValue();
    const enhet = useAtomValue(aktivEnhetAtom) as string;

    return $api.useMutation('post', '/rest/dialogmerking/lukk-traad', {
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: $api.queryOptions('post', '/rest/v2/dialog/meldinger', {
                    body: { fnr },
                    params: { query: { enhet } }
                }).queryKey
            });
            toast.success('Tråden ble avsluttet');
        },
        onError: () => {
            toast.error('Kunne ikke avslutte tråden');
        }
    });
};

export const useUtbetalinger = (startDato: string, sluttDato: string) => {
    const fnr = usePersonAtomValue();
    return $api.useSuspenseQuery('post', '/rest/v2/utbetaling', {
        body: { fnr },
        params: { query: { startDato, sluttDato } }
    });
};

export const useOppfolging = () => {
    const start = dayjs().subtract(3, 'months').format('YYYY-MM-DD');
    const slutt = dayjs().format('YYYY-MM-DD');

    const fnr = usePersonAtomValue();
    return $api.useSuspenseQuery('post', '/rest/v2/oppfolging/ytelserogkontrakter', {
        body: { fnr, start, slutt }
    });
};

export const useGjeldende14aVedtak = () => {
    const fnr = usePersonAtomValue();
    return $api.useSuspenseQuery('post', '/rest/v2/oppfolging/hent-gjeldende-14a-vedtak', {
        body: { fnr }
    });
};
