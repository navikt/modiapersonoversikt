import { createActionsAndReducer } from './restReducer';
import { fetchVeilederRoller } from '../../api/veileder-roller-api';

const { reducer, action, actionNames } = createActionsAndReducer('veileder_roller');

export function getVeilederRoller() {
    return action(() => fetchVeilederRoller());
}

export { actionNames as veilederRollerReducerActionNames};
export default reducer;