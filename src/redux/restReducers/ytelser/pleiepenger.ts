import { createActionsAndReducer } from '../restReducer';
import { getPleiepenger } from '../../../api/ytelser-api';

const { reducer, action, reload } = createActionsAndReducer('pleiepenger');

export function hentPleiepenger(fødselsnummer: string) {
    return action(() => getPleiepenger(fødselsnummer));
}

export function reloadPleiepenger(fødselsnummer: string) {
    return reload(() => getPleiepenger(fødselsnummer));
}

export default reducer;