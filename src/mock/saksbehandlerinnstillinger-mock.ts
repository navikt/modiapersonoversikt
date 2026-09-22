import { HttpResponse, http, type PathParams } from 'msw';
import {
    INNSTILLINGER_KEY_SAKSBEHANDLER_NAVN,
    type Innstillinger,
    type SaksbehandlerInnstillinger
} from 'src/lib/clients/innstillinger';

const localstoreageKey = 'modia-innstillinger-mock';
const finnesILocalStorage = localStorage.getItem(localstoreageKey);
const defaultInnstillinger: SaksbehandlerInnstillinger = {
    sistLagret: '2020-04-07T12:12:54',
    innstillinger: {
        'har-sett-ny-modia-dialog': 'true',
        [INNSTILLINGER_KEY_SAKSBEHANDLER_NAVN]: ''
    }
};

let innstillinger =
    finnesILocalStorage !== null
        ? (JSON.parse(finnesILocalStorage) as SaksbehandlerInnstillinger)
        : defaultInnstillinger;

export const saksbehandlerInnstillingerHandlers = [
    http.get(`${import.meta.env.BASE_URL}proxy/modia-innstillinger/api/innstillinger`, () =>
        HttpResponse.json(innstillinger)
    ),

    http.post<PathParams, Innstillinger>(
        `${import.meta.env.BASE_URL}proxy/modia-innstillinger/api/innstillinger`,
        async ({ request }) => {
            const body = await request.json();
            innstillinger = {
                sistLagret: new Date().toISOString(),
                innstillinger: body
            };
            window.localStorage.setItem(localstoreageKey, JSON.stringify(innstillinger));
            return HttpResponse.json(innstillinger);
        }
    )
];
