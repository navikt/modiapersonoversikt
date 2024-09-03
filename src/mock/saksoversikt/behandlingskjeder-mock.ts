import { Behandlingskjede, Behandlingsstatus } from '../../models/saksoversikt/sakstema';
import { fyllRandomListe } from '../utils/mock-utils';
import NavFaker from 'nav-faker/dist/navfaker';
import { getSaksdato } from './saksoversikt-felles-mock';
import { Faker } from '@faker-js/faker';

export function getBehandlingskjeder(faker: Faker, navfaker: NavFaker): Behandlingskjede[] {
    if (navfaker.random.vektetSjanse(0.3)) {
        return [];
    }

    return fyllRandomListe(() => getBehandlingskjede(faker, navfaker), navfaker.random.vektetSjanse(0.7) ? 1 : 3);
}

export function getBehandlingskjede(faker: Faker, navfaker: NavFaker): Behandlingskjede {
    return {
        status: getBehandlingsstatus(faker),
        sistOppdatert: getSaksdato(navfaker)
    };
}

function getBehandlingsstatus(faker: Faker): Behandlingsstatus {
    return faker.helpers.arrayElement([
        Behandlingsstatus.UnderBehandling,
        Behandlingsstatus.FerdigBehandlet,
        Behandlingsstatus.Avbrutt
    ]);
}
