import { AppState } from '../../reducers';
import { apiBaseUri } from '../../../api/config';
import createPostResourceReducerAndActions from '../../../rest/utils/postResource';
import { OpprettOppgaveRequest } from '../../../models/meldinger/oppgave';
import { AsyncDispatch } from '../../ThunkTypes';

export function getOpprettOppgaveUri(state: AppState): string {
    return `${apiBaseUri}/dialogoppgave/opprett`;
}

export function opprettOppgaveAction(request: OpprettOppgaveRequest) {
    return (dispatch: AsyncDispatch, getState: () => AppState) => {
        const state = getState();

        dispatch(state.restResources.opprettOppgave.actions.post(request));
    };
}

export default createPostResourceReducerAndActions<OpprettOppgaveRequest>('opprett-oppgave', getOpprettOppgaveUri);
