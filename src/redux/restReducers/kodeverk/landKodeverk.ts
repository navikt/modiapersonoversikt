import { createActionsAndReducerDeprecated } from '../deprecatedRestResource';
import { fetchKodeverk } from '../../../api/kodeverk';

const { reducer, action, actionNames } = createActionsAndReducerDeprecated('kodeverk-land');

export function hentLandKodeverk() {
    return action(() => fetchKodeverk('Landkoder'));
}

export const landActionNames = actionNames;
export default reducer;
