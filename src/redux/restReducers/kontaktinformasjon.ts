import { createRestResourceReducerAndActions } from '../../rest/utils/restResource';
import { apiBaseUri } from '../../api/config';
import { AppState } from '../reducers';
import { KRRKontaktinformasjon } from '../../models/kontaktinformasjon';

export function getKontaktinformasjonFetchUri(state: AppState) {
    const fnr = state.gjeldendeBruker.fødselsnummer;
    return `${apiBaseUri}/person/${fnr}/kontaktinformasjon`;
}

const { reducer, actionNames } = createRestResourceReducerAndActions<KRRKontaktinformasjon>(
    'kontaktinformasjon',
    getKontaktinformasjonFetchUri
);

export const kontaktinformasjonActionNames = actionNames;

export default reducer;
