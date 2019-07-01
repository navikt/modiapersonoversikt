import { AppState } from '../../reducers';
import { apiBaseUri } from '../../../api/config';
import createPostResourceReducerAndActions from '../../../rest/utils/postResource';
import { KontorsperrRequest } from '../../../models/meldinger/merk';

export function getMerkKontorsperretBaseUrl(state: AppState): string {
    return `${apiBaseUri}/dialogmerking/kontorsperret`;
}

export default createPostResourceReducerAndActions<KontorsperrRequest>(
    'merk-kontorsperret',
    getMerkKontorsperretBaseUrl
);
