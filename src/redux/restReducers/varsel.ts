import { createActionsAndReducer } from './restReducer';
import { getVarsel } from '../../api/varsel-api';

const { reducer, action, reload, tilbakestillReducer } = createActionsAndReducer('varsel');

export function hentVarsel(fødselsnummer: string) {
    return action(() => getVarsel(fødselsnummer));
}

export function reloadVarsel(fødselsnummer: string) {
    return reload(() => getVarsel(fødselsnummer));
}

export function resetVarselReducer() {
    return tilbakestillReducer;
}

export default reducer;
