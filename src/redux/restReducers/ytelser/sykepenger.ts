import { createActionsAndReducer } from '../restReducer';
import { getSykepenger } from '../../../api/ytelser-api';

const { reducer, action, reload } = createActionsAndReducer('sykepenger');

export function hentSykepenger(fødselsnummer: string) {
    return action(() => getSykepenger(fødselsnummer));
}

export function reloadSykepenger(fødselsnummer: string) {
    return reload(() => getSykepenger(fødselsnummer));
}

export default reducer;