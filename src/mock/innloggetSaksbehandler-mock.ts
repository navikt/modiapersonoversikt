import { InnloggetSaksbehandler } from '../models/innloggetSaksbehandler';

export function getMockInnloggetSaksbehandler(): InnloggetSaksbehandler {
    return {
        ident: 'Z990000',
        navn: 'Kari Etternavn',
        fornavn: 'Kari',
        etternavn: 'Etternavn'
    };
}
