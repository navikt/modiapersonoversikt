import { combineReducers } from 'redux';
import RestEndepunkterReducers, { RestEndepunkter } from './restReducers/restReducers';
import UIReducer, { UIState } from './uiReducers/UIReducer';
import temagruppeReducer, { TemagruppeState } from './temagruppe';
import { UtbetalingerState, utbetalingerReducer } from './utbetalinger/utbetalingerReducer';
import { saksoversiktReducer } from './saksoversikt/reducer';
import { SaksoversikState } from './saksoversikt/types';
import { default as pleiepengerReducer, PleiepengerState } from './ytelser/pleiepengerReducer';
import { default as tooltipReducer, TooltipState } from './uiReducers/toolTipReducer';

export interface AppState {
    restEndepunkter: RestEndepunkter;
    ui: UIState;
    temagruppe: TemagruppeState;
    utbetalinger: UtbetalingerState;
    saksoversikt: SaksoversikState;
    pleiepenger: PleiepengerState;
    tooltip: TooltipState;
}

export default combineReducers<AppState>({
    restEndepunkter: RestEndepunkterReducers,
    ui: UIReducer,
    temagruppe: temagruppeReducer,
    utbetalinger: utbetalingerReducer,
    saksoversikt: saksoversiktReducer,
    pleiepenger: pleiepengerReducer,
    tooltip: tooltipReducer
});
