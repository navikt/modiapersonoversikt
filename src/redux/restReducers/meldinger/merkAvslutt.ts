import { AppState } from '../../reducers';
import { apiBaseUri } from '../../../api/config';
import createPostResourceReducerAndActions from '../../../rest/utils/postResource';
import { AvsluttUtenSvarRequest } from '../../../models/meldinger/merk';

export function getMerkAvsluttBaseUrl(state: AppState): string {
    return `${apiBaseUri}/dialogmerking/avslutt`;
}

export default createPostResourceReducerAndActions<AvsluttUtenSvarRequest>('merk-avslutt', getMerkAvsluttBaseUrl);
