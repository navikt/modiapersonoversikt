import { combineReducers } from 'redux';
import RestEndepunkterReducers, { RestEndepunkter } from './restReducers/restReducers';
import VisittkortUiReducer, { VisittkortUi } from './uiReducers/VisittkortUIDuck';
import temagruppeReducer from './temagruppe';

export interface AppState {
    restEndepunkter: RestEndepunkter;
    visittkortUi: VisittkortUi;
    valgtTemagruppe: string;
}

export default combineReducers<AppState>({
    restEndepunkter: RestEndepunkterReducers,
    visittkortUi: VisittkortUiReducer,
    valgtTemagruppe: temagruppeReducer,
});
