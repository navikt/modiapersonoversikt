import { createActionsAndReducer } from '../restResource';
import { getPleiepenger } from '../../../api/ytelser-api';

const { reducer, action, reload, tilbakestill } = createActionsAndReducer('pleiepenger');

export function hentPleiepenger(fødselsnummer: string) {
    return action(() => getPleiepenger(fødselsnummer));
}

export function reloadPleiepenger(fødselsnummer: string) {
    return reload(() => getPleiepenger(fødselsnummer));
}

export function resetPleiepengerResource() {
    return tilbakestill;
}

export default reducer;
