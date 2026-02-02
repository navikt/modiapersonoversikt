import { useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';
import { FetchError } from 'src/api/api';
import { apiBaseUriWithoutRest } from 'src/api/config';
import { FeatureToggles } from 'src/components/featureToggle/toggleIDs';
import useFeatureToggle from 'src/components/featureToggle/useFeatureToggle';
import { toast } from 'src/components/toasts';
import { errorPlaceholder, responseErrorMessage } from 'src/components/ytelser/utils';
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
            let errText: string | undefined;
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
    const response = $api.useQuery('post', '/rest/person', {
        body: { fnr: aktivBruker }
    });
    const errorMessages = [errorPlaceholder(response, responseErrorMessage('informasjon om bruker'))];

    return {
        ...response,
        errorMessages: errorMessages.filter(Boolean)
    };
};

export const useVarslerData = () => {
    const aktivBruker = usePersonAtomValue();
    return $api.useQuery('post', '/rest/varsler', {
        body: { fnr: aktivBruker }
    });
};

export const useBaseUrls = () => {
    return $api.useQuery('get', '/rest/baseurls');
};

export const useSendMelding = () => {
    const queryClient = useQueryClient();
    const fnr = usePersonAtomValue();
    const enhet = useAtomValue(aktivEnhetAtom) as string;

    return $api.useMutation('post', '/rest/dialog/sendmelding', {
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: $api.queryOptions('post', '/rest/dialog/meldinger', {
                    body: { fnr },
                    params: { query: { enhet } }
                }).queryKey
            });
            toast.success('Melding sendt');
        },
        onError: () => {
            toast.error('Kunne ikke sende melding');
        },
        throwOnError: false
    });
};

export const useJournalforMutation = () => {
    const queryClient = useQueryClient();
    const fnr = usePersonAtomValue();
    const enhet = useAtomValue(aktivEnhetAtom) as string;

    return $api.useMutation('post', '/rest/journalforing/{traadId}', {
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: $api.queryOptions('post', '/rest/dialog/meldinger', {
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
    return $api.useQuery('post', '/rest/journalforing/saker/', {
        body: { fnr: aktivBruker }
    });
};

export const usePersonOppgaver = () => {
    const aktivBruker = usePersonAtomValue();

    return $api.useQuery('post', '/rest/oppgaver/tildelt', {
        body: {
            fnr: aktivBruker
        }
    });
};

export const useOppgave = (oppgaveId?: string) => {
    if (oppgaveId === undefined) return { data: undefined, isLoading: false, isError: false };
    // biome-ignore lint/correctness/useHookAtTopLevel:Biome migration - bør fikses
    return $api.useQuery('get', '/rest/oppgaver/oppgavedata/{oppgaveId}', {
        params: { path: { oppgaveId: oppgaveId } }
    });
};

export const useOppgaveForTraad = (traadId: string) => {
    const { data: oppgaver = [] } = usePersonOppgaver();

    const oppgave = oppgaver.find((oppgave) => oppgave.traadId === traadId);
    const erSTOOppgave = !!oppgave?.erSTOOppgave;

    return { oppgave, erSTOOppgave };
};

export const useAvsluttOppgaveMutation = () => {
    const queryClient = useQueryClient();
    const fnr = usePersonAtomValue();

    return $api.useMutation('post', '/rest/dialogmerking/avsluttgosysoppgave', {
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: $api.queryOptions('post', '/rest/oppgaver/tildelt', {
                    body: { fnr }
                }).queryKey
            });
        }
    });
};

export const useMeldinger = () => {
    const fnr = usePersonAtomValue();
    const enhet = useAtomValue(aktivEnhetAtom) as string;

    return $api.useQuery('post', '/rest/dialog/meldinger', {
        body: { fnr },
        params: { query: { enhet } }
    });
};

export const useTraadById = (traadId: string) => {
    const fnr = usePersonAtomValue();
    const enhet = useAtomValue(aktivEnhetAtom) ?? '';
    const { data: traader } = $api.useQuery('post', '/rest/dialog/meldinger', {
        body: { fnr },
        params: { query: { enhet } }
    });

    const traad = traader?.find((t) => t.traadId === traadId);

    return traad;
};

export const useInnloggetSaksbehandler = () => {
    const response = $api.useQuery('get', '/rest/hode/me');
    const errorMessages = [errorPlaceholder(response, responseErrorMessage('info om innlogget saksbehandler'))];
    return {
        ...response,
        errorMessages: errorMessages.filter(Boolean)
    };
};

export const useSladdeAarsaker = (traadId: string) => {
    const response = $api.useQuery('get', '/rest/dialogmerking/sladdearsaker/{kjedeid}', {
        params: { path: { kjedeid: traadId } }
    });
    const errorMessages = [errorPlaceholder(response, responseErrorMessage('sladde årsaker'))];
    return {
        ...response,
        data: response?.data ?? [],
        errorMessages: errorMessages.filter(Boolean)
    };
};

export const useSendTilSladdingMutation = () => {
    const queryClient = useQueryClient();
    const fnr = usePersonAtomValue();
    const enhet = useAtomValue(aktivEnhetAtom) as string;

    return $api.useMutation('post', '/rest/dialogmerking/sladding', {
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: $api.queryOptions('post', '/rest/dialog/meldinger', {
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
                queryKey: $api.queryOptions('post', '/rest/dialog/meldinger', {
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
                queryKey: $api.queryOptions('post', '/rest/dialog/meldinger', {
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

export const useSakerDokumenter = () => {
    const fnr = usePersonAtomValue();
    const enhet = useAtomValue(aktivEnhetAtom) as string;
    return $api.useQuery('post', '/rest/saker/saker_og_dokumenter', {
        body: { fnr },
        params: { query: { enhet } }
    });
};

export const useUtbetalinger = (startDato: string, sluttDato: string) => {
    const fnr = usePersonAtomValue();
    return $api.useQuery('post', '/rest/utbetaling', {
        body: { fnr },
        params: { query: { startDato, sluttDato } }
    });
};

export const useGjeldende14aVedtak = () => {
    const fnr = usePersonAtomValue();
    const response = $api.useQuery('post', '/rest/oppfolging/hent-gjeldende-14a-vedtak', {
        body: { fnr }
    });

    const errorMessages = [errorPlaceholder(response, responseErrorMessage('14a vedtak'))];
    return {
        ...response,
        errorMessages: errorMessages.filter(Boolean)
    };
};

export const useArbeidsoppfolging = () => {
    const fnr = usePersonAtomValue();
    const response = $api.useQuery('post', '/rest/oppfolging/ytelserogkontrakter', {
        body: { fnr }
    });

    const errorMessages = [errorPlaceholder(response, responseErrorMessage('arbeidsoppfølging'))];
    return {
        ...response,
        errorMessages: errorMessages.filter(Boolean)
    };
};

export const useSykefravaersoppfolging = () => {
    const fnr = usePersonAtomValue();
    const response = $api.useQuery('post', '/rest/oppfolging/sykefravaeroppfolging', {
        body: { fnr }
    });
    const errorMessages = [errorPlaceholder(response, responseErrorMessage('sykefraværoppfølging'))];
    return {
        ...response,
        errorMessages: errorMessages.filter(Boolean)
    };
};

export const useGsakTema = () => {
    return $api.useQuery('get', '/rest/dialogoppgave/tema');
};

export const useOppgaveMutation = () => {
    const queryClient = useQueryClient();
    const fnr = usePersonAtomValue();

    return $api.useMutation('post', '/rest/dialogoppgave/opprett', {
        onSuccess: () => {
            toast.success('Opprettet oppgave');
            queryClient.invalidateQueries({
                queryKey: $api.queryOptions('post', '/rest/oppgaver/tildelt', {
                    body: { fnr }
                }).queryKey
            });
        },
        onError: () => {
            toast.error('Kunne ikke opprette oppgaven');
        }
    });
};

export const useOppgaveBehandlerEnheter = () => {
    return $api.useQuery('get', '/rest/enheter/oppgavebehandlere/alle');
};

export const useAnsattePaaEnhet = (enhetId: string) => {
    return $api.useQuery(
        'get',
        '/rest/enheter/{enhetId}/ansatte',
        {
            params: { path: { enhetId } }
        },
        {
            enabled: enhetId.length > 0
        }
    );
};

export const useForeslotteEnheter = ({
    temakode,
    typekode,
    underkategori
}: {
    temakode?: string;
    typekode?: string;
    underkategori?: string;
}) => {
    const fnr = usePersonAtomValue();

    return $api.useQuery(
        'post',
        '/rest/enheter/oppgavebehandlere/foreslatte',
        {
            body: {
                fnr,
                temakode: temakode ?? '',
                typekode: typekode ?? '',
                underkategori
            }
        },
        {
            enabled: !!(temakode && typekode)
        }
    );
};

export const useForeldrepenger = (fom: string, tom: string) => {
    const enableForeldrepengerInfotrygd = useFeatureToggle(FeatureToggles.InfotrygdForeldrepenger).isOn;
    const fnr = usePersonAtomValue();
    return $api.useQuery(
        'post',
        '/rest/ytelse/foreldrepenger',
        {
            body: { fnr, fom, tom }
        },
        {
            enabled: enableForeldrepengerInfotrygd
        }
    );
};

export const usePleiepenger = (fom: string, tom: string) => {
    const enablePleiepengerInfotrygd = useFeatureToggle(FeatureToggles.InfotrygdPleiepenger).isOn;
    const fnr = usePersonAtomValue();
    return $api.useQuery(
        'post',
        '/rest/ytelse/pleiepenger',
        {
            body: { fnr, fom, tom }
        },
        {
            enabled: enablePleiepengerInfotrygd
        }
    );
};

export const useSykepenger = (fom: string, tom: string) => {
    const enableSykepengerInfotrygd = useFeatureToggle(FeatureToggles.InfotrygdSykepenger).isOn;
    const fnr = usePersonAtomValue();
    return $api.useQuery(
        'post',
        '/rest/ytelse/sykepenger',
        {
            body: { fnr, fom, tom }
        },
        {
            enabled: enableSykepengerInfotrygd
        }
    );
};

export const useTiltakspenger = (fom: string, tom: string) => {
    const fnr = usePersonAtomValue();
    return $api.useQuery('post', '/rest/ytelse/tiltakspenger', {
        body: { fnr, fom, tom }
    });
};

export const usePensjon = (fom: string, tom: string) => {
    const fnr = usePersonAtomValue();
    return $api.useQuery('post', '/rest/ytelse/pensjon', {
        body: { fnr, fom, tom }
    });
};

export const useArbeidsavklaringspenger = (fom: string, tom: string) => {
    const fnr = usePersonAtomValue();
    return $api.useQuery('post', '/rest/ytelse/arbeidsavklaringspenger', {
        body: { fnr, fom, tom }
    });
};

export const useForeldrepengerFpSak = (fom: string, tom: string) => {
    const fnr = usePersonAtomValue();
    return $api.useQuery('post', '/rest/ytelse/foreldrepenger_fpsak', {
        body: { fnr, fom, tom }
    });
};

export const useSykepengerSpokelse = (fom: string, tom: string) => {
    const { isOn } = useFeatureToggle(FeatureToggles.SpokelseSykepenger);
    const fnr = usePersonAtomValue();
    return $api.useQuery(
        'post',
        '/rest/ytelse/spokelse_sykepenger',
        {
            body: { fnr, fom, tom }
        },
        {
            enabled: isOn
        }
    );
};
