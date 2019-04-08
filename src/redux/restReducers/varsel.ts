import { createActionsAndReducerDeprecated } from './deprecatedRestResource';
import { getVarsel } from '../../api/varsel-api';

const { reducer, action, reload, tilbakestill, actionNames } = createActionsAndReducerDeprecated('varsel');

export function hentVarsel(fødselsnummer: string) {
    return action(() => getVarsel(fødselsnummer));
}

export function reloadVarsel(fødselsnummer: string) {
    return reload(() => getVarsel(fødselsnummer));
}

export function resetVarselResource() {
    return tilbakestill;
}

export { actionNames as varselActionNames };

export default reducer;
