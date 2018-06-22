import { createActionsAndReducer } from '../restReducer';
import { postEndreNorskGateadresse } from '../../api/brukerprofil/adresse-api';
import { GateadresseSkjemainput } from '../../app/brukerprofil/adresse/GateadresseForm';

const { reducer, action, tilbakestillReducer, actionNames } = createActionsAndReducer('endreadresse');

export function endreNorskGateadresse(fødselsnummer: string, gateadresse: GateadresseSkjemainput) {
    return action(() => postEndreNorskGateadresse(fødselsnummer, gateadresse));
}

export function reset() {
    return tilbakestillReducer;
}

export { actionNames };
export default reducer;