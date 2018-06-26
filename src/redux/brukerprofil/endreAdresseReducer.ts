import { createActionsAndReducer } from '../restReducer';
import { postEndreMatrikkeladresse, postEndreNorskGateadresse } from '../../api/brukerprofil/adresse-api';
import { Gateadresse, Matrikkeladresse } from '../../models/personadresse';

const { reducer, action, tilbakestillReducer, actionNames } = createActionsAndReducer('endreadresse');

export function endreNorskGateadresse(fødselsnummer: string, gateadresse: Gateadresse) {
    return action(() => postEndreNorskGateadresse(fødselsnummer, gateadresse));
}

export function endreMatrikkeladresse(fødselsnummer: string, matrikkeladresse: Matrikkeladresse) {
    return action(() => postEndreMatrikkeladresse(fødselsnummer, matrikkeladresse));
}

export function reset() {
    return tilbakestillReducer;
}

export { actionNames };
export default reducer;