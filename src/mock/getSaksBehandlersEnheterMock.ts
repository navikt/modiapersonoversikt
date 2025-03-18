import type { SaksbehandlersEnheter } from '../rest/resources/saksbehandlersEnheterResource';
import { enheter } from './context-mock';

export function getSaksBehandlersEnheterMock(): SaksbehandlersEnheter {
    return {
        ident: 'Z999999',
        enhetliste: enheter
    };
}
