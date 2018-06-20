import { createActionsAndReducer } from '../restReducer';
import { postEndreNorskGateadresse } from '../../api/brukerprofil/adresse-api';
import { Gateadresse } from '../../models/personadresse';

const { reducer, action, tilbakestillReducer, actionNames } = createActionsAndReducer('endreadresse');

export function endreNorskGateadresse(fødselsnummer: string, gateadresse: Gateadresse) {
    return action(() => postEndreNorskGateadresse(fødselsnummer, gateadresse));
}

export function reset() {
    return tilbakestillReducer;
}

export { actionNames };
export default reducer;