import { AppState } from '../reducers';
import { apiBaseUri } from '../../api/config';
import { createRestResourceReducerAndActions } from '../../rest/utils/restResource';
import { SaksbehandlersEnheter } from '../../models/saksbehandlersEnheter';

export function getSaksbehandlersEnheterUri(state: AppState): string {
    return `${apiBaseUri}/hode/enheter`;
}

export default createRestResourceReducerAndActions<SaksbehandlersEnheter>(
    'saksbehandlers-enheter',
    getSaksbehandlersEnheterUri
);
