import { createActionsAndReducer } from './restReducer';
import { getOppfolging } from '../../api/oppfolging-api';

const { reducer, action, reload, tilbakestillReducer } = createActionsAndReducer('utbetalinger');

export function hentOppfolging(fødselsnummer: string) {
    return action(() => getOppfolging(fødselsnummer));
}

export function reloadOppfolging(fødselsnummer: string) {
    return reload(() => getOppfolging(fødselsnummer));
}

export function resetOppfolgingReducer() {
    return tilbakestillReducer;
}

export default reducer;