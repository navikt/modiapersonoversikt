import { createActionsAndReducer } from '../restReducer';
import { EndreNavnRequest } from './endreNavnRequest';
import { postEndreNavn } from '../../api/endrenavn-api';

const { reducer, action, resetReducer, actionNames } = createActionsAndReducer('endrenavn');

export function endreNavn(request: EndreNavnRequest) {
    return action(() => postEndreNavn(request));
}

export function reset() {
    return resetReducer;
}

export { actionNames };
export default reducer;