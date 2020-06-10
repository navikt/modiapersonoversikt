import { createRestResourceReducerAndActions } from '../../rest/utils/restResource';
import { apiBaseUri } from '../../api/config';
import { AppState } from '../reducers';
import { KRRKontaktinformasjon } from '../../models/kontaktinformasjon';

function getKontaktinformasjonFetchUri(state: AppState) {
    const fnr = state.gjeldendeBruker.fødselsnummer;
    return `${apiBaseUri}/person/${fnr}/kontaktinformasjon`;
}

export default createRestResourceReducerAndActions<KRRKontaktinformasjon>(
    'kontaktinformasjon',
    getKontaktinformasjonFetchUri
);
