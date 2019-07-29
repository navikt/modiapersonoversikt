import { AppState } from '../reducers';
import { apiBaseUri } from '../../api/config';
import { createRestResourceReducerAndActions } from '../../rest/utils/restResource';
import { SakstemaResponse } from '../../models/saksoversikt/sakstema';

function getSaksoversiktFetchUri(state: AppState) {
    const fodselsnummer = state.gjeldendeBruker.fødselsnummer;
    return `${apiBaseUri}/saker/${fodselsnummer}/sakstema`;
}

export default createRestResourceReducerAndActions<SakstemaResponse>('saksoversikt', getSaksoversiktFetchUri);
