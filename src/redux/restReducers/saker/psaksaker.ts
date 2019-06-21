import { AppState } from '../../reducers';
import { apiBaseUri } from '../../../api/config';
import { createRestResourceReducerAndActions } from '../../../rest/utils/restResource';
import { JournalforingsSak } from '../../../app/personside/infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';

function getPsakSakerFetchUri(state: AppState): string {
    const fnr = state.gjeldendeBruker.fødselsnummer;
    return `${apiBaseUri}/journalforing/${fnr}/saker/pensjon`;
}

export default createRestResourceReducerAndActions<JournalforingsSak[]>('psak', getPsakSakerFetchUri);
