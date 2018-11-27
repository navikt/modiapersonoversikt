import { combineReducers } from 'redux';
import RestEndepunkterReducers, { RestEndepunkter } from './restReducers/restReducers';
import UIReducer, { UIState } from './uiReducers/UIReducer';
import temagruppeReducer, { TemagruppeState } from './temagruppe';
import { UtbetalingerReducerState, utbetalingerStateReducer } from './utbetalinger/utbetalingerStateReducer';
import { saksoversiktReducer } from './saksoversikt/reducer';
import { SaksoversikState } from './saksoversikt/types';

export interface AppState {
    restEndepunkter: RestEndepunkter;
    ui: UIState;
    temagruppe: TemagruppeState;
    utbetalinger: UtbetalingerReducerState;
    saksoversikt: SaksoversikState;
}

export default combineReducers<AppState>({
    restEndepunkter: RestEndepunkterReducers,
    ui: UIReducer,
    temagruppe: temagruppeReducer,
    utbetalinger: utbetalingerStateReducer,
    saksoversikt: saksoversiktReducer,
});
