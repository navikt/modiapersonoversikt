import { enheter } from './context-mock';
import { SaksbehandlersEnheter } from '../rest/resources/saksbehandlersEnheter';

export function getSaksBehandlersEnheterMock(): SaksbehandlersEnheter {
    return {
        ident: 'Z990000',
        enhetliste: enheter
    };
}
