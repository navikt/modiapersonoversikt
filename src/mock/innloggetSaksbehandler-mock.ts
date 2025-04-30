import type { InnloggetSaksbehandler } from '../rest/resources/innloggetSaksbehandlerResource';

export function getMockInnloggetSaksbehandler(): InnloggetSaksbehandler {
    return {
        ident: 'Z999999',
        navn: 'Kari Etternavn',
        fornavn: 'Kari',
        etternavn: 'Etternavn'
    };
}
