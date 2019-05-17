import { AppState } from '../reducers';
import { apiBaseUri } from '../../api/config';
import { createRestResourceReducerAndActions } from '../../rest/utils/restResource';
import { InnloggetSaksbehandler } from '../../models/innloggetSaksbehandler';

export function getMeldingerFetchUri(state: AppState): string {
    return `${apiBaseUri}/hode/me`;
}

export default createRestResourceReducerAndActions<InnloggetSaksbehandler>(
    'innloggetSaksbehandler',
    getMeldingerFetchUri
);
