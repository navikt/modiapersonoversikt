import { combineReducers } from 'redux';
import RestEndepunkterReducers, { RestEndepunkter } from './restReducers/restReducers';
import UIReducer, { UIState } from './uiReducers/UIReducer';
import temagruppeReducer, { TemagruppeState } from './temagruppe';
import { utbetalingerReducer } from './utbetalinger/utbetalingerReducer';
import { saksoversiktReducer } from './saksoversikt/reducer';
import { SaksoversikState } from './saksoversikt/types';
import { KontrollSpørsmålState } from './kontrollSporsmal/types';
import kontrollspørsmålReducer from './kontrollSporsmal/reducer';
import ytelserReducere, { YtelserState } from './ytelser/ytelserReducere';
import { OppfolgingState } from './oppfolging/types';
import { oppfolgingReducer } from './oppfolging/reducer';
import { GjeldendeBrukerState } from './gjeldendeBruker/types';
import gjeldendeBrukerReducer from './gjeldendeBruker/reducer';
import { UtbetalingerState } from './utbetalinger/types';
import { MeldingerState } from './restReducers/meldinger/types';
import { meldingerReducer } from './restReducers/meldinger/reducer';

export interface AppState {
    restEndepunkter: RestEndepunkter;
    ui: UIState;
    temagruppe: TemagruppeState;
    utbetalinger: UtbetalingerState;
    saksoversikt: SaksoversikState;
    meldinger: MeldingerState;
    ytelser: YtelserState;
    kontrollSpørsmål: KontrollSpørsmålState;
    oppfolging: OppfolgingState;
    gjeldendeBruker: GjeldendeBrukerState;
}

export default combineReducers<AppState>({
    restEndepunkter: RestEndepunkterReducers,
    ui: UIReducer,
    temagruppe: temagruppeReducer,
    utbetalinger: utbetalingerReducer,
    saksoversikt: saksoversiktReducer,
    meldinger: meldingerReducer,
    ytelser: ytelserReducere,
    kontrollSpørsmål: kontrollspørsmålReducer,
    oppfolging: oppfolgingReducer,
    gjeldendeBruker: gjeldendeBrukerReducer
});
