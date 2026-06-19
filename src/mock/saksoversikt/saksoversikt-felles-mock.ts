import type { Faker } from '@faker-js/faker';
import type NavFaker from 'nav-faker/dist/navfaker';
import { DokumentmetadataBaksystem } from 'src/generated/modiapersonoversikt-api';

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

export function getBaksystem(faker: Faker): DokumentmetadataBaksystem {
    return faker.helpers.arrayElement([
        DokumentmetadataBaksystem.SAK_OG_BEHANDLING,
        DokumentmetadataBaksystem.PESYS,
        DokumentmetadataBaksystem.PDF_KONVERTERING,
        DokumentmetadataBaksystem.KODEVERK,
        DokumentmetadataBaksystem.JOARK_SIKKERHETSBEGRENSNING,
        DokumentmetadataBaksystem.JOARK,
        DokumentmetadataBaksystem.HENVENDELSE,
        DokumentmetadataBaksystem.GSAK,
        DokumentmetadataBaksystem.AKTOER
    ]);
}
