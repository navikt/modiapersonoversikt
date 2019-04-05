import { createActionsAndReducerDeprecated } from '../deprecatedRestResource';
import { fetchKodeverk } from '../../../api/kodeverk';

const { reducer, action, actionNames } = createActionsAndReducerDeprecated('kodeverk-retningsnummer');

export function hentRetningsnummere() {
    return action(() => fetchKodeverk('Retningsnumre'));
}

export const retningsnummerKodeverkActionNames = actionNames;
export default reducer;
