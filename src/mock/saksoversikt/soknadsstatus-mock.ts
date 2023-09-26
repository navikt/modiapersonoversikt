import { Soknadsstatus } from '../../models/saksoversikt/sakstema';
import NavFaker from 'nav-faker/dist/navfaker';

export function getSoknadsstatus(faker: Faker.FakerStatic, navfaker: NavFaker): Soknadsstatus {
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
