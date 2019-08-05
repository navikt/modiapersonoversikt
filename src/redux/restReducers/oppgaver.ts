import { Oppgave } from '../../models/oppgave';
import { AppState } from '../reducers';
import { apiBaseUri } from '../../api/config';
import createPostResourceReducerAndActions from '../../rest/utils/postResource';

function getOppgaveFetchUri(state: AppState) {
    const temagruppe = state.temagruppe.valgtTemagruppe;
    return `${apiBaseUri}/oppgaver/plukk/${temagruppe}`;
}

export default createPostResourceReducerAndActions<{}, Oppgave[]>('oppgave', getOppgaveFetchUri);

export function selectFodselsnummerfraOppgaver(oppgaver: Oppgave[]) {
    if (oppgaver.length === 0) {
        return null;
    } else {
        return oppgaver[0].fødselsnummer;
    }
}
