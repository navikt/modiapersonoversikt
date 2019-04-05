import { createActionsAndReducerDeprecated } from './deprecatedRestResource';
import { getVarsel } from '../../api/varsel-api';

const { reducer, action, reload, tilbakestill } = createActionsAndReducerDeprecated('varsel');

export function hentVarsel(fødselsnummer: string) {
    return action(() => getVarsel(fødselsnummer));
}

export function reloadVarsel(fødselsnummer: string) {
    return reload(() => getVarsel(fødselsnummer));
}

export function resetVarselResource() {
    return tilbakestill;
}

export default reducer;
