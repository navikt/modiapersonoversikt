import { LeggTilbakeOppgaveRequest } from '../../models/oppgave';
import { AppState } from '../reducers';
import { apiBaseUri } from '../../api/config';
import createPostResourceReducerAndActions from '../../rest/utils/postResource';

function getLeggTilbakeOppgavePostUri(state: AppState) {
    return `${apiBaseUri}/oppgaver/legg-tilbake`;
}

export default createPostResourceReducerAndActions<LeggTilbakeOppgaveRequest>(
    'leggTilbakeOppgave',
    getLeggTilbakeOppgavePostUri
);
