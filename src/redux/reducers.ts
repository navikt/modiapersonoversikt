import restEndepunkterReducers, { RestEndepunkter } from './restReducers/restReducers';
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
import { MeldingerState } from './meldinger/types';
import { meldingerReducer } from './meldinger/reducer';
import { OppgaveState } from './oppgave/types';
import { oppgaverReducer } from './oppgave/reducer';
import { combineResettableReducers } from './reducer-utils';

export interface AppState {
    restResources: RestEndepunkter;
    ui: UIState;
    temagruppe: TemagruppeState;
    utbetalinger: UtbetalingerState;
    saksoversikt: SaksoversikState;
    meldinger: MeldingerState;
    oppgaver: OppgaveState;
    ytelser: YtelserState;
    kontrollSpørsmål: KontrollSpørsmålState;
    oppfolging: OppfolgingState;
    gjeldendeBruker: GjeldendeBrukerState;
}

export default combineResettableReducers<AppState>(
    {
        restResources: restEndepunkterReducers,
        ui: UIReducer,
        temagruppe: temagruppeReducer,
        utbetalinger: utbetalingerReducer,
        saksoversikt: saksoversiktReducer,
        meldinger: meldingerReducer,
        oppgaver: oppgaverReducer,
        ytelser: ytelserReducere,
        kontrollSpørsmål: kontrollspørsmålReducer,
        oppfolging: oppfolgingReducer,
        gjeldendeBruker: gjeldendeBrukerReducer
    },
    ['gjeldendeBruker', 'temagruppe', 'restResources']
);
