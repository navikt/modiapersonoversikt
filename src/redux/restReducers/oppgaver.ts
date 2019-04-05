import { plukkOppgaveFraServer } from '../../api/oppgave-api';
import { createActionsAndReducerDeprecated } from './deprecatedRestResource';
import { Oppgave } from '../../models/oppgave';

const { reducer, action } = createActionsAndReducerDeprecated<Oppgave[]>('oppgave');

export function plukkOppgaver(temagruppe: string) {
    return action(() => plukkOppgaveFraServer(temagruppe));
}

export function selectFodselsnummerfraOppgaver(oppgaver: Oppgave[]) {
    if (oppgaver.length === 0) {
        return null;
    } else {
        return oppgaver[0].fødselsnummer;
    }
}

export default reducer;
