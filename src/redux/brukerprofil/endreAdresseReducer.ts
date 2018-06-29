import { createActionsAndReducer } from '../restReducer';
import {
    postEndreMatrikkeladresse, postEndreNorskGateadresse,
    postEndrePostboksadresse, postSlettMidlertidigeAdresser
} from '../../api/brukerprofil/adresse-api';
import { Gateadresse, Matrikkeladresse, Postboksadresse } from '../../models/personadresse';

const { reducer, action, tilbakestillReducer, actionNames } = createActionsAndReducer('endreadresse');

export function endreNorskGateadresse(fødselsnummer: string, gateadresse: Gateadresse) {
    return action(() => postEndreNorskGateadresse(fødselsnummer, gateadresse));
}

export function endreMatrikkeladresse(fødselsnummer: string, matrikkeladresse: Matrikkeladresse) {
    return action(() => postEndreMatrikkeladresse(fødselsnummer, matrikkeladresse));
}

export function endrePostboksadrese(fødselsnummer: string, postboksadresse: Postboksadresse) {
    return action(() => postEndrePostboksadresse(fødselsnummer, postboksadresse));
}

export function slettMidlertidigeAdresser(fødselsnummer: string) {
    return action(() => postSlettMidlertidigeAdresser(fødselsnummer));
}

export function reset() {
    return tilbakestillReducer;
}

export { actionNames };
export default reducer;