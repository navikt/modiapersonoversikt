import { NavKontaktinformasjon } from '../../models/person/NAVKontaktinformasjon';
import { getSistOppdatert, vektetSjanse } from '../utils/mock-utils';
import FakerStatic = Faker.FakerStatic;

export function getNavKontaktinformasjon(faker: FakerStatic) {
    let kontaktinformasjon: NavKontaktinformasjon = {};

    if (vektetSjanse(faker, 0.7)) {
        kontaktinformasjon.mobil = {
            sistEndret: getSistOppdatert(),
            sistEndretAv: '1010800 BD03',
            identifikator: faker.phone.phoneNumber('9#######'),
            retningsnummer: '47'
        };
    }

    if (vektetSjanse(faker, 0.3)) {
        kontaktinformasjon.jobb = {
            sistEndret: getSistOppdatert(),
            sistEndretAv: '1010800 BD03',
            identifikator: faker.phone.phoneNumber('########'),
            retningsnummer: '47'
        };
    }

    if (vektetSjanse(faker, 0.3)) {
        kontaktinformasjon.hjem = {
            sistEndret: getSistOppdatert(),
            sistEndretAv: '1010800 BD03',
            identifikator: faker.phone.phoneNumber('########'),
            retningsnummer: '47'
        };
    }

    return kontaktinformasjon;

}