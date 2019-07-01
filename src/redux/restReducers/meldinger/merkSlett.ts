import { AppState } from '../../reducers';
import { apiBaseUri } from '../../../api/config';
import createPostResourceReducerAndActions from '../../../rest/utils/postResource';
import { RequestMedBehandlingskjede } from '../../../models/meldinger/merk';

export function getMerkSlettBaseUrl(state: AppState): string {
    return `${apiBaseUri}/dialogmerking/slett`;
}

export default createPostResourceReducerAndActions<RequestMedBehandlingskjede>('merk-slett', getMerkSlettBaseUrl);
