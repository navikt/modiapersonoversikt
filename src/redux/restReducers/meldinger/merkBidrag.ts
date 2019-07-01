import { AppState } from '../../reducers';
import { apiBaseUri } from '../../../api/config';
import createPostResourceReducerAndActions from '../../../rest/utils/postResource';
import { RequestMedTraadId } from '../../../models/meldinger/merk';

export function getMerkBidragBaseUrl(state: AppState): string {
    return `${apiBaseUri}/dialogmerking/bidrag`;
}

export default createPostResourceReducerAndActions<RequestMedTraadId>('merk-bidrag', getMerkBidragBaseUrl);
