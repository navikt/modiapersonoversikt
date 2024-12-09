import gjeldendeBrukerReducer from './gjeldendeBruker/reducer';
import type { GjeldendeBrukerState } from './gjeldendeBruker/types';
import { oppfolgingReducer } from './oppfolging/reducer';
import type { OppfolgingState } from './oppfolging/types';
import { oppgaverReducer } from './oppgave/reducer';
import type { OppgaveState } from './oppgave/types';
import { combineResettableReducers } from './reducer-utils';
import { saksoversiktReducer } from './saksoversikt/reducer';
import type { SaksoversikState } from './saksoversikt/types';
import type { UtbetalingerState } from './utbetalinger/types';
import { utbetalingerReducer } from './utbetalinger/utbetalingerReducer';
import varslerReducer, { type VarslerState } from './varsler/varslerReducer';

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
