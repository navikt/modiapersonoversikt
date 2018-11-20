import { combineReducers } from 'redux';
import RestEndepunkterReducers, { RestEndepunkter } from './restReducers/restReducers';
import UiReducer, { UIState } from './uiReducers/UIReducer';
import temagruppeReducer from './temagruppe';
import { UtbetalingerReducerState, utbetalingerStateReducer } from './utbetalinger/utbetalingerStateReducer';
import { SaksoversiktReduxState, saksoversiktStateReducer } from './saksoversikt/saksoversiktStateReducer';

export interface AppState {
    restEndepunkter: RestEndepunkter;
    ui: UIState;
    valgtTemagruppe: string;
    utbetalinger: UtbetalingerReducerState;
    saksoversikt: SaksoversiktReduxState;
}

export default combineReducers<AppState>({
    restEndepunkter: RestEndepunkterReducers,
    ui: UiReducer,
    valgtTemagruppe: temagruppeReducer,
    utbetalinger: utbetalingerStateReducer,
    saksoversikt: saksoversiktStateReducer
});
