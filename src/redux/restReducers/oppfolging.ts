import { createActionsAndReducer } from './restReducer';
import { getDetaljertOppfolging, getOppfolging } from '../../api/oppfolging-api';

const { reducer, action, reload, tilbakestillReducer } = createActionsAndReducer('oppfolging');

export function hentOppfolging(fødselsnummer: string) {
    return action(() => getOppfolging(fødselsnummer));
}

export function reloadOppfolging(fødselsnummer: string) {
    return reload(() => getOppfolging(fødselsnummer));
}

export function resetOppfolgingReducer() {
    return tilbakestillReducer;
}

export function hentDetaljertOppfolging(fødselsnummer: string) {
    return action(() => getDetaljertOppfolging(fødselsnummer));
}

export default reducer;
