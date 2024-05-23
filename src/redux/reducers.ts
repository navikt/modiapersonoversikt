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
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';

export interface AppState {
    utbetalinger: UtbetalingerState;
    saksoversikt: SaksoversikState;
    oppgaver: OppgaveState;
    ytelser: YtelserState;
    varsler: VarslerState;
    oppfolging: OppfolgingState;
    gjeldendeBruker: GjeldendeBrukerState;
    router: RouterState;
}

const createRootReducer = (history: History) =>
    combineResettableReducers<AppState>(
        {
            utbetalinger: utbetalingerReducer,
            saksoversikt: saksoversiktReducer,
            oppgaver: oppgaverReducer,
            ytelser: ytelserReducer,
            varsler: varslerReducer,
            oppfolging: oppfolgingReducer,
            gjeldendeBruker: gjeldendeBrukerReducer,
            router: connectRouter(history)
        },
        ['gjeldendeBruker', 'router']
    );

export default createRootReducer;
