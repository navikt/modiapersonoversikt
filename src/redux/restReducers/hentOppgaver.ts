import { AppState } from '../reducers';
import { apiBaseUri } from '../../api/config';
import createPostResourceReducerAndActions from '../../rest/utils/postResource';
import { Oppgave } from '../../models/meldinger/oppgave';

function getOppgaveFetchUri(state: AppState) {
    const temagruppe = state.session.temagruppeForPlukk;
    const enhet = state.session.valgtEnhetId;
    const header = enhet ? `?enhet=${enhet}` : '';
    return `${apiBaseUri}/oppgaver/plukk/${temagruppe}${header}`;
}

export default createPostResourceReducerAndActions<{}, Oppgave[]>('HentOppgave', getOppgaveFetchUri);
