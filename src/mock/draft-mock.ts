import FetchMock, { JSONObject, MockHandler, ResponseUtils } from 'yet-another-fetch-mock';
import { getMockInnloggetSaksbehandler } from './innloggetSaksbehandler-mock';
import { Draft, DraftContext } from '../app/personside/dialogpanel/use-draft';
import { randomDelay } from './index';

const innloggetSaksbehandler = getMockInnloggetSaksbehandler();
const storage = window.localStorage;
const storageKey = 'modiapersonoversikt-drafts-mock';
if (!storage.getItem(storageKey)) {
    console.log('init mock', storage.getItem(storageKey));
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
let drafts: Array<Draft & JSONObject> = JSON.parse(storage.getItem('modiapersonoversikt-drafts-mock')!);

function matchContext(context: DraftContext, other: DraftContext, exact: boolean = true): boolean {
    const keys = Object.keys(context);
    const otherKeys = Object.keys(other);
    if (exact && keys.length !== otherKeys.length) {
        return false;
    } else if (exact && !keys.every(key => otherKeys.includes(key))) {
        return false;
    }

    return otherKeys.every(key => {
        const value = context[key];
        const otherValue = other[key];
        return value === otherValue;
    });
}

const findDrafts: MockHandler = ({ queryParams }) => {
    const exact = !(queryParams['exact'] === 'false');
    const context: DraftContext = { ...queryParams };
    delete context['exact'];
    const matchedDrafts: Array<Draft & JSONObject> = drafts.filter((draft: Draft) =>
        matchContext(draft.context, context, exact)
    );

    return ResponseUtils.jsonPromise(matchedDrafts);
};

const updateDraft: MockHandler = ({ body }) => {
    const newDraft: Draft & JSONObject = {
        owner: innloggetSaksbehandler.ident,
        content: body.content,
        context: body.context,
        created: new Date().toISOString()
    };

    drafts = drafts.filter((draft: Draft) => !matchContext(draft.context, body.context, true));
    drafts.push(newDraft);
    storage.setItem(storageKey, JSON.stringify(drafts));

    return ResponseUtils.jsonPromise(newDraft);
};

const deleteDraft: MockHandler = ({ body }) => {
    const context: DraftContext = { ...body };
    drafts = drafts.filter((draft: Draft) => !matchContext(draft.context, context, true));
    storage.setItem(storageKey, JSON.stringify(drafts));

    return ResponseUtils.jsonPromise({ status: 200 });
};

export function setupDraftMock(mock: FetchMock) {
    // console.log(findDrafts, updateDraft, deleteDraft);
    mock.get('/modiapersonoversikt-draft/api/draft', ResponseUtils.delayed(2 * randomDelay(), findDrafts));
    mock.post('/modiapersonoversikt-draft/api/draft', ResponseUtils.delayed(2 * randomDelay(), updateDraft));
    mock.delete('/modiapersonoversikt-draft/api/draft', ResponseUtils.delayed(2 * randomDelay(), deleteDraft));
}
