import { Oppgave } from '../../models/oppgave';
import { AppState } from '../reducers';
import { apiBaseUri } from '../../api/config';
import createPostResourceReducerAndActions from '../../rest/utils/postResource';

function getOppgaveFetchUri(state: AppState) {
    const temagruppe = state.temagruppe.valgtTemagruppe;
    return `${apiBaseUri}/oppgaver/plukk/${temagruppe}`;
}

export default createPostResourceReducerAndActions<{}, Oppgave[]>('oppgave', getOppgaveFetchUri);
