import { createActionsAndReducer } from '../restReducer';
import { getSykepenger } from '../../../api/ytelser-api';

const { reducer, action, reload, tilbakestillReducer } = createActionsAndReducer('sykepenger');

export function hentSykepenger(fødselsnummer: string) {
    return action(() => getSykepenger(fødselsnummer));
}

export function reloadSykepenger(fødselsnummer: string) {
    return reload(() => getSykepenger(fødselsnummer));
}

export function resetSykepengerReducer() {
    return tilbakestillReducer;
}

export default reducer;