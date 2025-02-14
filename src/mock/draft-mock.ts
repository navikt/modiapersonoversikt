import { http, HttpResponse, type HttpResponseResolver } from 'msw';
import type { Draft, DraftContext } from '../app/personside/dialogpanel/use-draft';
import { getMockInnloggetSaksbehandler } from './innloggetSaksbehandler-mock';
import MockWebsocket from './mock-websocket';
import { delayed, randomDelay } from './utils-mock';

const innloggetSaksbehandler = getMockInnloggetSaksbehandler();
const storage = window.localStorage;
const storageKey = 'modiapersonoversikt-drafts-mock';
if (!storage.getItem(storageKey)) {
    storage.setItem(
        storageKey,
        JSON.stringify([
            {
                owner: innloggetSaksbehandler.ident,
                content: 'Dette er innhold fra kladde-løsningen',
                context: { fnr: '10108000398' },
                created: new Date().toISOString()
            }
        ])
    );
}
//biome-ignore lint/style/noNonNullAssertion: biome migration
const drafts = JSON.parse(storage.getItem('modiapersonoversikt-drafts-mock')!) as Draft[];

function matchContext(context: DraftContext, other: DraftContext, exact = true): boolean {
    const keys = Object.keys(context);
    const otherKeys = Object.keys(other);
    if (exact && keys.length !== otherKeys.length) {
        return false;
    }
    if (exact && !keys.every((key) => otherKeys.includes(key))) {
        return false;
    }

    return otherKeys.every((key) => {
        const value = context[key];
        const otherValue = other[key];
        return value === otherValue;
    });
}

const findDrafts: HttpResponseResolver = ({ request }) => {
    const queryParams = new URL(request.url).searchParams;
    const exact = !(queryParams.get('exact') === 'false');
    const context: DraftContext = { ...queryParams.entries };
    context.exact = 'false';
    const matchedDrafts: Array<Draft> = drafts.filter((draft: Draft) => matchContext(draft.context, context, exact));

    return HttpResponse.json(matchedDrafts);
};

const generateUid = () => {
    return HttpResponse.json('abba-acdc-1231-beef');
};

MockWebsocket.setup();

export const getDraftHandlers = () => [
    http.get(`${import.meta.env.BASE_URL}proxy/modia-draft/api/draft`, delayed(2 * randomDelay(), findDrafts)),
    http.get(`${import.meta.env.BASE_URL}proxy/modia-draft/api/generate-uid`, delayed(2 * randomDelay(), generateUid))
];
