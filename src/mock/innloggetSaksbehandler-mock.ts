import type { InnloggetSaksbehandler } from '../rest/resources/innloggetSaksbehandlerResource';

export function getMockInnloggetSaksbehandler(): InnloggetSaksbehandler {
    return {
        ident: 'Z990000',
        navn: 'Kari Etternavn',
        fornavn: 'Kari',
        etternavn: 'Etternavn'
    };
}
