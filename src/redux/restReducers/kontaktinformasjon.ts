import { createRestResourceReducer } from '../../rest/utils/restResource';
import { apiBaseUri } from '../../api/config';
import { AppState } from '../reducers';

export function getKontaktinformasjonFetchUri(state: AppState) {
    const fnr = state.gjeldendeBruker.fødselsnummer;
    return `${apiBaseUri}/person/${fnr}/kontaktinformasjon`;
}

const { reducer, actionNames } = createRestResourceReducer('kontaktinformasjon', getKontaktinformasjonFetchUri);

export const kontaktinformasjonActionNames = actionNames;

export default reducer;
