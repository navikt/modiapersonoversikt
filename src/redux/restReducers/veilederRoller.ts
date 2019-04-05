import { createActionsAndReducerDeprecated } from './deprecatedRestResource';
import { fetchVeilederRoller } from '../../api/veileder-roller-api';

const { reducer, action, actionNames } = createActionsAndReducerDeprecated('veileder_roller');

export function getVeilederRoller() {
    return action(() => fetchVeilederRoller());
}

export { actionNames as veilederRollerReducerActionNames };
export default reducer;
