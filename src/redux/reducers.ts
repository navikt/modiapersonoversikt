import { combineReducers } from 'redux';
import RestEndepunkterReducers, { RestEndepunkter } from './restReducers/restReducers';
import UiReducer, { UIState } from './uiReducers/UIReducer';
import temagruppeReducer from './temagruppe';

export interface AppState {
    restEndepunkter: RestEndepunkter;
    ui: UIState;
    valgtTemagruppe: string;
}

export default combineReducers<AppState>({
    restEndepunkter: RestEndepunkterReducers,
    ui: UiReducer,
    valgtTemagruppe: temagruppeReducer,
});
