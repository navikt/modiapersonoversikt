import { combineReducers } from 'redux';
import RestEndepunkterReducers, { RestEndepunkter } from './restReducers/restReducers';
import UIReducer, { UIState } from './uiReducers/UIReducer';
import temagruppeReducer, { TemagruppeState } from './temagruppe';
import { UtbetalingerState, utbetalingerReducer } from './utbetalinger/utbetalingerReducer';
import { saksoversiktReducer } from './saksoversikt/reducer';
import { SaksoversikState } from './saksoversikt/types';
import { featureToggleReducer, FeatureToggleState } from './featureToggle/featureToggleReducer';
import { KontrollSpørsmålState } from './kontrollSporsmal/types';
import kontrollspørsmålReducer from './kontrollSporsmal/reducer';
import ytelserReducere, { YtelserState } from './ytelser/ytelserReducere';

export interface AppState {
    restEndepunkter: RestEndepunkter;
    ui: UIState;
    temagruppe: TemagruppeState;
    utbetalinger: UtbetalingerState;
    saksoversikt: SaksoversikState;
    ytelser: YtelserState;
    featureToggle: FeatureToggleState;
    kontrollSpørsmål: KontrollSpørsmålState;
}

export default combineReducers<AppState>({
    restEndepunkter: RestEndepunkterReducers,
    ui: UIReducer,
    temagruppe: temagruppeReducer,
    utbetalinger: utbetalingerReducer,
    saksoversikt: saksoversiktReducer,
    ytelser: ytelserReducere,
    featureToggle: featureToggleReducer,
    kontrollSpørsmål: kontrollspørsmålReducer
});
