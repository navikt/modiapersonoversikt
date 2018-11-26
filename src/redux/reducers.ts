import { combineReducers } from 'redux';
import RestEndepunkterReducers, { RestEndepunkter } from './restReducers/restReducers';
import UiReducer, { UIState } from './uiReducers/UIReducer';
import temagruppeReducer, { TemagruppeState } from './temagruppe';
import { UtbetalingerReducerState, utbetalingerStateReducer } from './utbetalinger/utbetalingerStateReducer';
import { SaksoversiktReduxState, saksoversiktStateReducer } from './saksoversikt/saksoversiktStateReducer';
import { YtelserReducerState, ytelserStateReducer } from './ytelser/yteslerStateReducer';

export interface AppState {
    restEndepunkter: RestEndepunkter;
    ui: UIState;
    temagruppe: TemagruppeState;
    utbetalinger: UtbetalingerReducerState;
    saksoversikt: SaksoversiktReduxState;
    ytelser: YtelserReducerState;
}

export default combineReducers<AppState>({
    restEndepunkter: RestEndepunkterReducers,
    ui: UiReducer,
    temagruppe: temagruppeReducer,
    utbetalinger: utbetalingerStateReducer,
    saksoversikt: saksoversiktStateReducer,
    ytelser: ytelserStateReducer
});
