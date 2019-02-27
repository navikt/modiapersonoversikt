import { createActionsAndReducer } from './restReducer';
import { getSaksoversikt } from '../../api/saksoversikt-api';

const { reducer, action, reload, tilbakestillReducer, actionNames } = createActionsAndReducer('saksoversikt');

export function hentSaksoversikt(fødselsnummer: string) {
    return action(() => getSaksoversikt(fødselsnummer));
}

export function reloadSaksoversikt(fødselsnummer: string) {
    return reload(() => getSaksoversikt(fødselsnummer));
}

export function resetSaksoversiktReducer() {
    return tilbakestillReducer;
}

export const saksoversiktActions = actionNames;
export default reducer;
