import { createActionsAndReducer } from '../restReducer';
import { EndreKontonummerRequest } from './endreKontonummerRequest';
import { postEndreKontonummer } from '../../api/brukerprofil/endreKontonummer-api';

const { reducer, action, tilbakestillReducer, actionNames } = createActionsAndReducer('endre-kontonummer');

export function endreKontonummer(fødselsnummer: string, request: EndreKontonummerRequest) {
    return action(() => postEndreKontonummer(fødselsnummer, request));
}

export function reset() {
    return tilbakestillReducer;
}

export { actionNames };
export default reducer;
