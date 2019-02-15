import { createActionsAndReducer } from '../restReducer';
import { SafRequest } from './safRequest';
import { postSaf } from '../../../api/saf';

const { reducer, action, tilbakestillReducer, actionNames } = createActionsAndReducer('saf');

export function saf(request: SafRequest) {
    return action(() => postSaf(request));
}

export function reset() {
    return tilbakestillReducer;
}

export { actionNames };
export default reducer;
