import { createActionsAndReducer } from '../restReducer';
import { EndreNavnRequest } from './endreNavnRequest';
import { postEndreNavn } from '../../../api/brukerprofil/endrenavn-api';

const { reducer, action, tilbakestillReducer, actionNames } = createActionsAndReducer('endrenavn');

export function endreNavn(request: EndreNavnRequest) {
    return action(() => postEndreNavn(request));
}

export function reset() {
    return tilbakestillReducer;
}

export { actionNames };
export default reducer;