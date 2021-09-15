import restEndepunkterReducers, { RestEndepunkter } from './restReducers/restReducers';
import UIReducer, { UIState } from './uiReducers/UIReducer';
import sessionReducer, { SessionState } from './session/session';
import { utbetalingerReducer } from './utbetalinger/utbetalingerReducer';
import { saksoversiktReducer } from './saksoversikt/reducer';
import { SaksoversikState } from './saksoversikt/types';
import { KontrollSporsmalState } from './kontrollSporsmal/types';
import kontrollsporsmalReducer from './kontrollSporsmal/reducer';
import ytelserReducer, { YtelserState } from './ytelser/ytelserReducer';
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
import varslerReducer, { VarslerState } from './varsler/varslerReducer';
import innstillingerReducer, { State as InnstillingerState } from './innstillinger';

export interface AppState {
    restResources: RestEndepunkter;
    ui: UIState;
    session: SessionState;
    utbetalinger: UtbetalingerState;
    saksoversikt: SaksoversikState;
    meldinger: MeldingerState;
    oppgaver: OppgaveState;
    ytelser: YtelserState;
    varsler: VarslerState;
    kontrollSporsmal: KontrollSporsmalState;
    oppfolging: OppfolgingState;
    gjeldendeBruker: GjeldendeBrukerState;
    innstillinger: InnstillingerState;
}

export default combineResettableReducers<AppState>(
    {
        restResources: restEndepunkterReducers,
        ui: UIReducer,
        session: sessionReducer,
        utbetalinger: utbetalingerReducer,
        saksoversikt: saksoversiktReducer,
        meldinger: meldingerReducer,
        oppgaver: oppgaverReducer,
        ytelser: ytelserReducer,
        varsler: varslerReducer,
        kontrollSporsmal: kontrollsporsmalReducer,
        oppfolging: oppfolgingReducer,
        gjeldendeBruker: gjeldendeBrukerReducer,
        innstillinger: innstillingerReducer
    },
    ['gjeldendeBruker', 'session', 'restResources', 'innstillinger']
);
