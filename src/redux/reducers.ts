import { combineReducers } from 'redux';
import RestEndepunkterReducers, { RestEndepunkter } from './restReducers/restReducers';
import UIReducer, { UIState } from './uiReducers/UIReducer';
import temagruppeReducer, { TemagruppeState } from './temagruppe';
import { UtbetalingerState, utbetalingerReducer } from './utbetalinger/utbetalingerReducer';
import { YtelserState, ytelserReducer } from './ytelser/yteslerStateReducer';
import { saksoversiktReducer } from './saksoversikt/reducer';
import { SaksoversikState } from './saksoversikt/types';
import { default as pleiepengerReducer, PleiepengerState } from './ytelser/pleiepengerReducer';

export interface AppState {
    restEndepunkter: RestEndepunkter;
    ui: UIState;
    temagruppe: TemagruppeState;
    utbetalinger: UtbetalingerState;
    saksoversikt: SaksoversikState;
    ytelser: YtelserState;
    pleiepenger: PleiepengerState;
}

export default combineReducers<AppState>({
    restEndepunkter: RestEndepunkterReducers,
    ui: UIReducer,
    temagruppe: temagruppeReducer,
    utbetalinger: utbetalingerReducer,
    saksoversikt: saksoversiktReducer,
    ytelser: ytelserReducer,
    pleiepenger: pleiepengerReducer
});
