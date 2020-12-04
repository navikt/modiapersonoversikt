import { AppState } from '../reducers';
import { apiBaseUri } from '../../api/config';
import { createRestResourceReducerAndActions } from '../../rest/utils/restResource';
import { SakstemaResponse } from '../../models/saksoversikt/sakstema';

function getSaksoversiktFetchUri(state: AppState) {
    const fodselsnummer = state.gjeldendeBruker.fødselsnummer;
    const enhet = state.session.valgtEnhetId;
    const header = enhet ? `?enhet=${enhet}` : '';
    return `${apiBaseUri}/saker/${fodselsnummer}/sakstema${header}`;
}

export default createRestResourceReducerAndActions<SakstemaResponse>('saksoversikt', getSaksoversiktFetchUri);
