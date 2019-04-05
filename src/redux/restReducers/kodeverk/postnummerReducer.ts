import { createActionsAndReducerDeprecated } from '../deprecatedRestResource';
import { fetchKodeverk } from '../../../api/kodeverk';

const { reducer, action, actionNames } = createActionsAndReducerDeprecated('kodeverk-postnummer');

export function hentPostnummere() {
    return action(() => fetchKodeverk('Postnummer'));
}

export { actionNames as postnummerActionNames };
export default reducer;
