import sessionReducer, { SessionState } from './session/session';
import { utbetalingerReducer } from './utbetalinger/utbetalingerReducer';
import { saksoversiktReducer } from './saksoversikt/reducer';
import { SaksoversikState } from './saksoversikt/types';
import ytelserReducer, { YtelserState } from './ytelser/ytelserReducer';
import { OppfolgingState } from './oppfolging/types';
import { oppfolgingReducer } from './oppfolging/reducer';
import { GjeldendeBrukerState } from './gjeldendeBruker/types';
import gjeldendeBrukerReducer from './gjeldendeBruker/reducer';
import { UtbetalingerState } from './utbetalinger/types';
import { OppgaveState } from './oppgave/types';
import { oppgaverReducer } from './oppgave/reducer';
import { combineResettableReducers } from './reducer-utils';
import varslerReducer, { VarslerState } from './varsler/varslerReducer';
import innstillingerReducer, { State as InnstillingerState } from './innstillinger';

export interface AppState {
    session: SessionState;
    utbetalinger: UtbetalingerState;
    saksoversikt: SaksoversikState;
    oppgaver: OppgaveState;
    ytelser: YtelserState;
    varsler: VarslerState;
    oppfolging: OppfolgingState;
    gjeldendeBruker: GjeldendeBrukerState;
    innstillinger: InnstillingerState;
}

export default combineResettableReducers<AppState>(
    {
        session: sessionReducer,
        utbetalinger: utbetalingerReducer,
        saksoversikt: saksoversiktReducer,
        oppgaver: oppgaverReducer,
        ytelser: ytelserReducer,
        varsler: varslerReducer,
        oppfolging: oppfolgingReducer,
        gjeldendeBruker: gjeldendeBrukerReducer,
        innstillinger: innstillingerReducer
    },
    ['gjeldendeBruker', 'session', 'innstillinger']
);
