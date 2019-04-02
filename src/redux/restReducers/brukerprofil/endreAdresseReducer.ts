import { createActionsAndReducer } from '../restResource';
import {
    postEndreMatrikkeladresse,
    postEndreNorskGateadresse,
    postEndrePostboksadresse,
    postEndreUtenlandsadresse,
    postSlettMidlertidigeAdresser
} from '../../../api/brukerprofil/adresse-api';
import { Gateadresse, Matrikkeladresse, Postboksadresse, Utlandsadresse } from '../../../models/personadresse';

const { reducer, action, tilbakestill, actionNames } = createActionsAndReducer('endreadresse');

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

export function endreUtlandsadresse(fødselsnummer: string, utlandsadresse: Utlandsadresse) {
    return action(() => postEndreUtenlandsadresse(fødselsnummer, utlandsadresse));
}

export function reset() {
    return tilbakestill;
}

export { actionNames };
export default reducer;
