import { createActionsAndReducer } from '../restReducer';
import { getForeldrepenger } from '../../../api/ytelser-api';

const { reducer, action, reload } = createActionsAndReducer('foreldrepenger');

export function hentForeldrepenger(fødselsnummer: string) {
    return action(() => getForeldrepenger(fødselsnummer));
}

export function reloadForeldrepenger(fødselsnummer: string) {
    return reload(() => getForeldrepenger(fødselsnummer));
}

export default reducer;