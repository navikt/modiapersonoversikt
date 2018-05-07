import { NavKontaktinformasjon } from '../../models/person/NAVKontaktinformasjon';
import { getSistOppdatert, vektetSjanse } from '../utils/mock-utils';
import FakerStatic = Faker.FakerStatic;

export function getNavKontaktinformasjon(faker: FakerStatic) {
    let kontaktinformasjon: NavKontaktinformasjon = {};

    if (vektetSjanse(faker, 0.7)) {
        kontaktinformasjon.mobil = {
            sistEndret: getSistOppdatert(),
            endretAv: 'BRUKER',
            nummer: faker.phone.phoneNumber('+479#######')
        };
    }

    if (vektetSjanse(faker, 0.3)) {
        kontaktinformasjon.jobbTelefon = {
            sistEndret: getSistOppdatert(),
            endretAv: 'BRUKER',
            nummer: faker.phone.phoneNumber('########')
        };
    }

    if (vektetSjanse(faker, 0.3)) {
        kontaktinformasjon.hjemTelefon = {
            sistEndret: getSistOppdatert(),
            endretAv: 'BRUKER',
            nummer: faker.phone.phoneNumber('########')
        };
    }

    return kontaktinformasjon;

}