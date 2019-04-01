import { createActionsAndReducer } from '../restResource';
import { EndreNavnRequest } from './endreNavnRequest';
import { postEndreNavn } from '../../../api/brukerprofil/endrenavn-api';

const { reducer, action, tilbakestill, actionNames } = createActionsAndReducer('endrenavn');

export function endreNavn(request: EndreNavnRequest) {
    return action(() => postEndreNavn(request));
}

export function reset() {
    return tilbakestill;
}

export { actionNames };
export default reducer;
