import { NavKontaktinformasjon } from '../../models/person/NAVKontaktinformasjon';
import { getSistOppdatert, vektetSjanse } from '../utils/mock-utils';

export function getNavKontaktinformasjon(faker: Faker.FakerStatic) {
    let kontaktinformasjon: NavKontaktinformasjon = {};

    if (vektetSjanse(faker, 0.7)) {
        kontaktinformasjon.mobil = getMockTelefon(faker, faker.phone.phoneNumber('9#######'));
    }

    if (vektetSjanse(faker, 0.3)) {
        kontaktinformasjon.jobbTelefon = getMockTelefon(faker, faker.phone.phoneNumber('########'));
    }

    if (vektetSjanse(faker, 0.3)) {
        kontaktinformasjon.hjemTelefon = getMockTelefon(faker, faker.phone.phoneNumber('########'));
    }

    return kontaktinformasjon;
}

function getMockTelefon(faker: Faker.FakerStatic, identifikator: string) {
    return {
        sistEndret: getSistOppdatert(),
        sistEndretAv: '1010800 BD03',
        identifikator: identifikator,
        retningsnummer: vektetSjanse(faker, 0.7) ? { kodeRef: '+47', beskrivelse: 'Norge' } : null
    };
}
