import FetchMock, { Handler } from 'yet-another-fetch-mock';
import { getMockInnloggetSaksbehandler } from './innloggetSaksbehandler-mock';
import { Draft, DraftContext } from '../app/personside/dialogpanel/use-draft';
import { randomDelay } from './index';
import { delayed } from './utils';

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
let drafts: Array<Draft> = JSON.parse(storage.getItem('modiapersonoversikt-drafts-mock')!);

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

const findDrafts: Handler = ({ queryParams }, res, ctx) => {
    const exact = !(queryParams['exact'] === 'false');
    const context: DraftContext = { ...queryParams };
    delete context['exact'];
    const matchedDrafts: Array<Draft> = drafts.filter((draft: Draft) => matchContext(draft.context, context, exact));

    return res(ctx.json(matchedDrafts));
};

const updateDraft: Handler = ({ body }, res, ctx) => {
    const newDraft: Draft = {
        owner: innloggetSaksbehandler.ident,
        content: body.content,
        context: body.context,
        created: new Date().toISOString()
    };

    drafts = drafts.filter((draft: Draft) => !matchContext(draft.context, body.context, true));
    drafts.push(newDraft);
    storage.setItem(storageKey, JSON.stringify(drafts));

    return res(ctx.json(newDraft));
};

const deleteDraft: Handler = ({ body }, res, ctx) => {
    const context: DraftContext = { ...body };
    drafts = drafts.filter((draft: Draft) => !matchContext(draft.context, context, true));
    storage.setItem(storageKey, JSON.stringify(drafts));

    return res(ctx.status(200));
};

export function setupDraftMock(mock: FetchMock) {
    // console.log(findDrafts, updateDraft, deleteDraft);
    mock.get('/modiapersonoversikt-draft/api/draft', delayed(2 * randomDelay(), findDrafts));
    mock.post('/modiapersonoversikt-draft/api/draft', delayed(2 * randomDelay(), updateDraft));
    mock.delete('/modiapersonoversikt-draft/api/draft', delayed(2 * randomDelay(), deleteDraft));
}
