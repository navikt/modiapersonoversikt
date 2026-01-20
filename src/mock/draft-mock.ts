import { HttpResponse, type HttpResponseResolver, http, type WebSocketData, ws } from 'msw';
import { delayed, randomDelay } from 'src/mock/utils-mock';
import type { Draft, DraftContext, WsConfirmation, WsEvent } from '../app/personside/dialogpanel/use-draft';
import { getMockInnloggetSaksbehandler } from './innloggetSaksbehandler-mock';

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
const draftWsHandler = ws
    .link('wss://modiapersonoversikt-draft.intern.dev.nav.no/api/draft/ws/*')
    .addEventListener('connection', ({ client }) => {
        client.addEventListener('message', (event: MessageEvent<WebSocketData>) => {
            const data = JSON.parse(event.data as string) as WsEvent;
            const draft = drafts.find((draft) => matchContext(draft.context, data.context));
            if (data.type === 'UPDATE' && data.content) {
                if (draft) {
                    draft.content = data.content;
                } else {
                    drafts.push({
                        owner: innloggetSaksbehandler.ident,
                        content: data.content,
                        context: data.context,
                        created: new Date().toISOString()
                    });
                }
            } else if (data.type === 'DELETE' && draft) {
                drafts.splice(drafts.indexOf(draft), 1);
            }
            storage.setItem(storageKey, JSON.stringify(drafts));
            client.send(JSON.stringify({ type: 'OK', time: new Date().toISOString() } as WsConfirmation));
        });
    });

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
    const exact = queryParams.get('exact') === 'true';
    // `exact` is not a part of the context, so we remove it before doing the comparison
    const context: DraftContext = Object.fromEntries(queryParams.entries().filter(([key]) => key !== 'exact'));
    const matchedDrafts: Array<Draft> = drafts.filter((draft: Draft) => {
        return matchContext(draft.context, context, exact);
    });

    return HttpResponse.json(matchedDrafts);
};

const generateUid = () => {
    return HttpResponse.json('abba-acdc-1231-beef');
};

export const getDraftHandlers = () => [
    draftWsHandler,
    http.get(`${import.meta.env.BASE_URL}proxy/modia-draft/api/draft`, delayed(2 * randomDelay(), findDrafts)),
    http.get(`${import.meta.env.BASE_URL}proxy/modia-draft/api/generate-uid`, delayed(2 * randomDelay(), generateUid))
];
