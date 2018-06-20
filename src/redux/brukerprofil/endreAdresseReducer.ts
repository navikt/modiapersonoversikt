import { createActionsAndReducer } from '../restReducer';
import { EndreAdresseRequest, postEndreAdresse } from '../../api/brukerprofil/adresse-api';

const { reducer, action, tilbakestillReducer, actionNames } = createActionsAndReducer('endreadresse');

export function endreAdresse(fødselsnummer: string, request: EndreAdresseRequest) {
    return action(() => postEndreAdresse(fødselsnummer, request));
}

export function reset() {
    return tilbakestillReducer;
}

export { actionNames };
export default reducer;