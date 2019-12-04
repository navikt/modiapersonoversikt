import { SaksbehandlersEnheter } from '../models/saksbehandlersEnheter';
import { enheter } from './context-mock';

export function getSaksBehandlersEnheterMock(): SaksbehandlersEnheter {
    return {
        ident: 'Z990000',
        enhetliste: enheter
    };
}
