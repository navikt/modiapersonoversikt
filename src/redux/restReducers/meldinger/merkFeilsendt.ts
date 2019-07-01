import { AppState } from '../../reducers';
import { apiBaseUri } from '../../../api/config';
import createPostResourceReducerAndActions from '../../../rest/utils/postResource';
import { RequestMedBehandlingskjede } from '../../../models/meldinger/merk';

export function getMerkFeilsendtBaseUrl(state: AppState): string {
    return `${apiBaseUri}/dialogmerking/feilsendt`;
}

export default createPostResourceReducerAndActions<RequestMedBehandlingskjede>(
    'merk-feilsendt',
    getMerkFeilsendtBaseUrl
);
