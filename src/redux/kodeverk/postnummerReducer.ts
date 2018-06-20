import { createActionsAndReducer } from '../restReducer';
import { fetchKodeverk } from '../../api/kodeverk';

const { reducer, action, actionNames } = createActionsAndReducer('kodeverk-postnummer');

export function hentPostnummere() {
    return action(() => fetchKodeverk('Postnummer'));
}

export {actionNames as postnummerActionNames}   ;
export default reducer;