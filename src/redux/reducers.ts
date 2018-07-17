import { combineReducers } from 'redux';
import RestEndepunkterReducers, { RestEndepunkter } from './restReducers/restReducers';
import VisittkortUiReducer, { VisittkortUi } from './uiReducers/VisittkortUIDuck';

export interface AppState {
   restEndepunkter: RestEndepunkter;
   visittkortUi: VisittkortUi;
}

export default combineReducers<AppState>({
    restEndepunkter: RestEndepunkterReducers,
    visittkortUi: VisittkortUiReducer
});
