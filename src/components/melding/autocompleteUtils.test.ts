import type { Me } from 'src/generated/modiapersonoversikt-api';
import { describe, expect, it } from 'vitest';
import { autofullfor, byggAutofullforMap } from './autocompleteUtils';

const saksbehandler: Me = {
    ident: 'Z999999',
    navn: 'Kari Etternavn',
    fornavn: 'Kari',
    etternavn: 'Etternavn'
};

describe('autofullfor for saksbehandler name', () => {
    it('uses the configured name when it is set', () => {
        const map = byggAutofullforMap('nb_NO', undefined, undefined, saksbehandler, 'Kari Nordmann');

        expect(autofullfor('[saksbehandler.navn]', map)).toBe('Kari Nordmann');
        expect(autofullfor('[saksbehandler.fornavn]', map)).toBe('Kari');
    });

    it('uses the logged-in saksbehandler name when no configured name exists', () => {
        const map = byggAutofullforMap('nb_NO', undefined, undefined, saksbehandler);

        expect(autofullfor('[saksbehandler.navn]', map)).toBe('Kari Etternavn');
    });

    it('uses the logged-in saksbehandler name when the configured name is blank', () => {
        const map = byggAutofullforMap('nb_NO', undefined, undefined, saksbehandler, '   ');

        expect(autofullfor('[saksbehandler.navn]', map)).toBe('Kari Etternavn');
    });
});
