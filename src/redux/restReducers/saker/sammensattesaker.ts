import { AppState } from '../../reducers';
import { apiBaseUri } from '../../../api/config';
import { createRestResourceReducerAndActions } from '../../../rest/utils/restResource';
import { JournalforingsSak } from '../../../app/personside/infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';

function getSammensatteSakerFetchUri(state: AppState): string {
    const fnr = state.gjeldendeBruker.fødselsnummer;
    return `${apiBaseUri}/journalforing/${fnr}/saker/sammensatte`;
}

export default createRestResourceReducerAndActions<JournalforingsSak[]>('saker', getSammensatteSakerFetchUri);
