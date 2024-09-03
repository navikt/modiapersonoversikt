import NavFaker from 'nav-faker/dist/navfaker';
import { Baksystem } from '../../models/saksoversikt/fellesSak';
import { Faker } from '@faker-js/faker';

export function getSaksdato(navfaker: NavFaker): string {
    return new Date(
        navfaker.random.integer(2018, 2016),
        navfaker.random.integer(12, 1),
        navfaker.random.integer(28, 1),
        navfaker.random.integer(23, 1),
        navfaker.random.integer(59, 1),
        navfaker.random.integer(59, 1),
        0
    ).toISOString();
}

export function getBaksystem(faker: Faker): Baksystem {
    return faker.helpers.arrayElement([
        Baksystem.SakOgBehandling,
        Baksystem.Pesys,
        Baksystem.PdfKonvertering,
        Baksystem.Kodeverk,
        Baksystem.JoarkSikkerhetsbegrensning,
        Baksystem.Joark,
        Baksystem.Henvendelse,
        Baksystem.Gsak,
        Baksystem.Aktoer
    ]);
}
