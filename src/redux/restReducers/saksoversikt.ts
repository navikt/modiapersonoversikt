import { createActionsAndReducerDeprecated } from './deprecatedRestResource';
import { getSaksoversikt } from '../../api/saksoversikt-api';

const { reducer, action, reload, tilbakestill, actionNames } = createActionsAndReducerDeprecated('saksoversikt');

export function hentSaksoversikt(fødselsnummer: string) {
    return action(() => getSaksoversikt(fødselsnummer));
}

export function reloadSaksoversikt(fødselsnummer: string) {
    return reload(() => getSaksoversikt(fødselsnummer));
}

export function resetSaksoversiktResource() {
    return tilbakestill;
}

export const saksoversiktActions = actionNames;
export default reducer;
