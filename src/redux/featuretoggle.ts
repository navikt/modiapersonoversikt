import { createActionsAndReducer } from './restReducer';
import { getFeatureToggle } from '../api/featuretoggle-api';

const { reducer, action, actionNames } = createActionsAndReducer('featuretoggle-nybrukerprofil');

export function hentFeatureToggle(toggleId: string) {
    return action(() => getFeatureToggle(toggleId));
}

export { actionNames };
export default reducer;