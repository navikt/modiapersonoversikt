import { createActionsAndReducer } from '../restReducer';
import { fetchKodeverk } from '../../../api/kodeverk';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';

const { reducer, action, actionNames } = createActionsAndReducer('kodeverk-postnummer');

export function hentPostnummere(): ActionCreator<ThunkAction<Action, IState, void>> {
    return action(() => fetchKodeverk('Postnummer'));
}

export {actionNames as postnummerActionNames}   ;
export default reducer;