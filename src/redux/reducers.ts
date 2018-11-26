import { combineReducers } from 'redux';
import RestEndepunkterReducers, { RestEndepunkter } from './restReducers/restReducers';
import UIReducer, { UIState } from './uiReducers/UIReducer';
import temagruppeReducer, { TemagruppeState } from './temagruppe';
<<<<<<< HEAD
import viktigÅViteReducer from './viktigAVite/reducer';
import { ViktigÅViteState } from './viktigAVite/types';
=======
import { UtbetalingerReducerState, utbetalingerStateReducer } from './utbetalinger/utbetalingerStateReducer';
import { SaksoversiktReduxState, saksoversiktStateReducer } from './saksoversikt/saksoversiktStateReducer';
>>>>>>> master

export interface AppState {
    restEndepunkter: RestEndepunkter;
    ui: UIState;
    temagruppe: TemagruppeState;
<<<<<<< HEAD
    viktigÅVite: ViktigÅViteState;
=======
    utbetalinger: UtbetalingerReducerState;
    saksoversikt: SaksoversiktReduxState;
>>>>>>> master
}

export default combineReducers<AppState>({
    restEndepunkter: RestEndepunkterReducers,
    ui: UIReducer,
    temagruppe: temagruppeReducer,
<<<<<<< HEAD
    viktigÅVite: viktigÅViteReducer
=======
    utbetalinger: utbetalingerStateReducer,
    saksoversikt: saksoversiktStateReducer
>>>>>>> master
});
