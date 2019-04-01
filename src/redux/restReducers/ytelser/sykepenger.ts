import { createActionsAndReducer } from '../restResource';
import { getSykepenger } from '../../../api/ytelser-api';

const { reducer, action, reload, tilbakestill } = createActionsAndReducer('sykepenger');

export function hentSykepenger(fødselsnummer: string) {
    return action(() => getSykepenger(fødselsnummer));
}

export function reloadSykepenger(fødselsnummer: string) {
    return reload(() => getSykepenger(fødselsnummer));
}

export function resetSykepengerResource() {
    return tilbakestill;
}

export default reducer;
