import { Behandlingskjede, Behandlingsstatus } from '../../models/saksoversikt/sakstema';
import { fyllRandomListe, vektetSjanse } from '../utils/mock-utils';
import NavFaker from 'nav-faker/dist/navfaker';
import { getSaksdato } from './saksoversikt-felles-mock';

export function getBehandlingskjeder(faker: Faker.FakerStatic, navfaker: NavFaker): Behandlingskjede[] {
    if (navfaker.random.vektetSjanse(0.3)) {
        return [];
    }

    return fyllRandomListe(() => getBehandlingskjede(faker, navfaker), navfaker.random.vektetSjanse(0.7) ? 1 : 3);
}

export function getBehandlingskjede(faker: Faker.FakerStatic, navfaker: NavFaker): Behandlingskjede {
    return {
        status: getBehandlingsstatus(faker),
        sistOppdatert: getSaksdato(navfaker)
    };
}

function getBehandlingsstatus(faker: Faker.FakerStatic): Behandlingsstatus {
    if (vektetSjanse(faker, 0.3)) {
        return Behandlingsstatus.UnderBehandling;
    } else if (vektetSjanse(faker, 0.3)) {
        return Behandlingsstatus.FerdigBehandlet;
    } else {
        return Behandlingsstatus.Avbrutt;
    }
}
