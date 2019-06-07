import { InnloggetSaksbehandler } from '../models/innloggetSaksbehandler';

export function getMockInnloggetSaksbehandler(): InnloggetSaksbehandler {
    return {
        ident: 'Z990000',
        navn: 'Kari Veileder',
        fornavn: 'Kari',
        etternavn: 'Etternavn'
    };
}
