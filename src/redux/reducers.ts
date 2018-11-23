import { combineReducers } from 'redux';
import RestEndepunkterReducers, { RestEndepunkter } from './restReducers/restReducers';
import UiReducer, { UIState } from './uiReducers/UIReducer';
import temagruppeReducer, { TemagruppeState } from './temagruppe';
import { UtbetalingerReducerState, utbetalingerStateReducer } from './utbetalinger/utbetalingerStateReducer';
import { SaksoversiktReduxState, saksoversiktStateReducer } from './saksoversikt/saksoversiktStateReducer';

export interface AppState {
    restEndepunkter: RestEndepunkter;
    ui: UIState;
    temagruppe: TemagruppeState;
    utbetalinger: UtbetalingerReducerState;
    saksoversikt: SaksoversiktReduxState;
}

export default combineReducers<AppState>({
    restEndepunkter: RestEndepunkterReducers,
    ui: UiReducer,
    temagruppe: temagruppeReducer,
    utbetalinger: utbetalingerStateReducer,
    saksoversikt: saksoversiktStateReducer
});
