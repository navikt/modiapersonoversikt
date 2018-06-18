import { NavKontaktinformasjon } from '../../models/person/NAVKontaktinformasjon';
import { getSistOppdatert, vektetSjanse } from '../utils/mock-utils';
import FakerStatic = Faker.FakerStatic;

export function getNavKontaktinformasjon(faker: FakerStatic) {
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

function getMockTelefon(faker: FakerStatic, identifikator: string) {
    return {
        sistEndret: getSistOppdatert(),
        sistEndretAv: '1010800 BD03',
        identifikator: identifikator,
        retningsnummer: { kodeRef: vektetSjanse(faker, 0.3) ? '' : '+47', beskrivelse: '' }
    };
}