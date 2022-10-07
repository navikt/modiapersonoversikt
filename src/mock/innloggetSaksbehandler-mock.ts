import { InnloggetSaksbehandler } from '../rest/resources/innloggetSaksbehandler';

export function getMockInnloggetSaksbehandler(): InnloggetSaksbehandler {
    return {
        ident: 'Z990000',
        navn: 'Kari Etternavn',
        fornavn: 'Kari',
        etternavn: 'Etternavn'
    };
}
