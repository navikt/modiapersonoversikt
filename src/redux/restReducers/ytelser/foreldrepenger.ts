import { createActionsAndReducer } from '../restResource';
import { getForeldrepenger } from '../../../api/ytelser-api';

const { reducer, action, reload, tilbakestill } = createActionsAndReducer('foreldrepenger');

export function hentForeldrepenger(fødselsnummer: string) {
    return action(() => getForeldrepenger(fødselsnummer));
}

export function reloadForeldrepenger(fødselsnummer: string) {
    return reload(() => getForeldrepenger(fødselsnummer));
}

export function resetForeldrepengerResource() {
    return tilbakestill;
}

export default reducer;
