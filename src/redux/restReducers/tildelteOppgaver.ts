import { apiBaseUri } from '../../api/config';
import { createRestResourceReducerAndActions } from '../../rest/utils/restResource';
import { Oppgave } from '../../models/meldinger/oppgave';
import { AppState } from '../reducers';

function getTildelteUrl(state: AppState) {
    const fnr = state.gjeldendeBruker.fødselsnummer;
    return `${apiBaseUri}/oppgaver/tildelt/${fnr}`;
}

export default createRestResourceReducerAndActions<Oppgave[]>('tildelteoppgaver', getTildelteUrl);
