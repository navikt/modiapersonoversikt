import { AppState } from '../../reducers';
import { apiBaseUri } from '../../../api/config';
import createPostResourceReducerAndActions from '../../../rest/utils/postResource';
import { OpprettOppgaveRequest } from '../../../models/meldinger/oppgave';

export function getOpprettOppgaveUri(state: AppState): string {
    return `${apiBaseUri}/dialogoppgave/opprett`;
}

export default createPostResourceReducerAndActions<OpprettOppgaveRequest>('oppgaver', getOpprettOppgaveUri);
