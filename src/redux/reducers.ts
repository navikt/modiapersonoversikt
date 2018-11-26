import { combineReducers } from 'redux';
import RestEndepunkterReducers, { RestEndepunkter } from './restReducers/restReducers';
import UIReducer, { UIState } from './uiReducers/UIReducer';
import temagruppeReducer, { TemagruppeState } from './temagruppe';
import { UtbetalingerReducerState, utbetalingerStateReducer } from './utbetalinger/utbetalingerStateReducer';
import { saksoversiktReducer } from './saksoversikt/reducer';
import viktigÅViteReducer from './viktigAVite/reducer';
import { ViktigÅViteState } from './viktigAVite/types';
import { SaksoversiktReduxState } from './saksoversikt/types';

export interface AppState {
    restEndepunkter: RestEndepunkter;
    ui: UIState;
    temagruppe: TemagruppeState;
    utbetalinger: UtbetalingerReducerState;
    saksoversikt: SaksoversiktReduxState;
    viktigÅVite: ViktigÅViteState;
}

export default combineReducers<AppState>({
    restEndepunkter: RestEndepunkterReducers,
    ui: UIReducer,
    temagruppe: temagruppeReducer,
    utbetalinger: utbetalingerStateReducer,
    saksoversikt: saksoversiktReducer,
    viktigÅVite: viktigÅViteReducer
});
