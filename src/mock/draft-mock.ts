import { getMockInnloggetSaksbehandler } from './innloggetSaksbehandler-mock';
import { Draft, DraftContext } from '../app/personside/dialogpanel/use-draft';
import { delayed, randomDelay } from './utils-mock';
import MockWebsocket from './mock-websocket';
import { HttpResponse, HttpResponseResolver, PathParams, http } from 'msw';

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
let drafts: Array<Draft> = JSON.parse(storage.getItem('modiapersonoversikt-drafts-mock')!);

function matchContext(context: DraftContext, other: DraftContext, exact: boolean = true): boolean {
    const keys = Object.keys(context);
    const otherKeys = Object.keys(other);
    if (exact && keys.length !== otherKeys.length) {
        return false;
    } else if (exact && !keys.every((key) => otherKeys.includes(key))) {
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
    delete context['exact'];
    const matchedDrafts: Array<Draft> = drafts.filter((draft: Draft) => matchContext(draft.context, context, exact));

    return HttpResponse.json(matchedDrafts);
};

const updateDraft: HttpResponseResolver<PathParams, DraftContext> = async ({ request }) => {
    const body = await request.json();
    const newDraft: Draft = {
        owner: innloggetSaksbehandler.ident,
        content: body.content,
        context: body.context,
        created: new Date().toISOString()
    };

    drafts = drafts.filter((draft: Draft) => !matchContext(draft.context, body.context, true));
    drafts.push(newDraft);
    storage.setItem(storageKey, JSON.stringify(drafts));

    return HttpResponse.json(newDraft);
};

const deleteDraft: HttpResponseResolver<PathParams, DraftContext> = async ({ request }) => {
    const body = await request.json();
    const context: DraftContext = { ...body };
    drafts = drafts.filter((draft: Draft) => !matchContext(draft.context, context, true));
    storage.setItem(storageKey, JSON.stringify(drafts));

    return HttpResponse.json(null);
};

const generateUid = () => {
    return HttpResponse.json('abba-acdc-1231-beef');
};

MockWebsocket.setup();

export const getDraftHandlers = () => [
    http.get(`${import.meta.env.BASE_URL}proxy/modia-draft/api/draft`, delayed(2 * randomDelay(), findDrafts)),
    http.post(`${import.meta.env.BASE_URL}proxy/modia-draft/api/draft`, delayed(2 * randomDelay(), updateDraft)),
    http.delete(`${import.meta.env.BASE_URL}proxy/modia-draft/api/draft`, delayed(2 * randomDelay(), deleteDraft)),
    http.get(`${import.meta.env.BASE_URL}proxy/modia-draft/api/generate-uid`, delayed(2 * randomDelay(), generateUid))
];
