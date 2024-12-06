import { utbetalingerReducer } from './utbetalinger/utbetalingerReducer';
import { saksoversiktReducer } from './saksoversikt/reducer';
import { SaksoversikState } from './saksoversikt/types';
import { OppfolgingState } from './oppfolging/types';
import { oppfolgingReducer } from './oppfolging/reducer';
import { GjeldendeBrukerState } from './gjeldendeBruker/types';
import gjeldendeBrukerReducer from './gjeldendeBruker/reducer';
import { UtbetalingerState } from './utbetalinger/types';
import { OppgaveState } from './oppgave/types';
import { oppgaverReducer } from './oppgave/reducer';
import { combineResettableReducers } from './reducer-utils';
import varslerReducer, { VarslerState } from './varsler/varslerReducer';

export interface AppState {
    utbetalinger: UtbetalingerState;
    saksoversikt: SaksoversikState;
    oppgaver: OppgaveState;
    varsler: VarslerState;
    oppfolging: OppfolgingState;
    gjeldendeBruker: GjeldendeBrukerState;
}

const createRootReducer = () =>
    combineResettableReducers<AppState>(
        {
            utbetalinger: utbetalingerReducer,
            saksoversikt: saksoversiktReducer,
            oppgaver: oppgaverReducer,
            varsler: varslerReducer,
            oppfolging: oppfolgingReducer,
            gjeldendeBruker: gjeldendeBrukerReducer
        },
        ['gjeldendeBruker']
    );

export default createRootReducer;
