import { createActionsAndReducer } from '../restResource';
import { fetchKodeverk } from '../../../api/kodeverk';

const { reducer, action, actionNames } = createActionsAndReducer('kodeverk-land');

export function hentLandKodeverk() {
    return action(() => fetchKodeverk('Landkoder'));
}

export const landActionNames = actionNames;
export default reducer;
