import type NavFaker from 'nav-faker/dist/navfaker';
import type { Soknadsstatus } from '../../models/saksoversikt/sakstema';

export function getSoknadsstatus(navfaker: NavFaker): Soknadsstatus {
    if (navfaker.random.vektetSjanse(0.3)) {
        return {
            avbrutt: 0,
            ferdigBehandlet: 0,
            underBehandling: 0
        };
    }

    return {
        avbrutt: navfaker.random.integer(10, 0),
        underBehandling: navfaker.random.integer(10, 0),
        ferdigBehandlet: navfaker.random.integer(10, 0),
        sistOppdatert: navfaker.dato.forÅrSiden(1).toString()
    };
}
