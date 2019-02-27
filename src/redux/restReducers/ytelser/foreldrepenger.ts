import { createActionsAndReducer } from '../restReducer';
import { getForeldrepenger } from '../../../api/ytelser-api';

const { reducer, action, reload, tilbakestillReducer } = createActionsAndReducer('foreldrepenger');

export function hentForeldrepenger(fødselsnummer: string) {
    return action(() => getForeldrepenger(fødselsnummer));
}

export function reloadForeldrepenger(fødselsnummer: string) {
    return reload(() => getForeldrepenger(fødselsnummer));
}

export function resetForeldrepengerReducer() {
    return tilbakestillReducer;
}

export default reducer;
