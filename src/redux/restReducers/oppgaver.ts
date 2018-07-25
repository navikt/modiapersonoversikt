import { plukkOppgaveFraServer } from '../../api/oppgave-api';
import { createActionsAndReducer } from './restReducer';
import { Oppgave } from '../../models/oppgave';

const { reducer, action } = createActionsAndReducer<Oppgave[]>('oppgave');

export function plukkOppgaver(enhet: string, temagruppe: string) {
    return action(() => plukkOppgaveFraServer(enhet, temagruppe));
}

export function selectFodselsnummerfraOppgaver(oppgaver: Oppgave[]) {
    if (oppgaver.length === 0) {
        return null;
    } else {
        return oppgaver[0].fødselsnummer;
    }
}

export default reducer;