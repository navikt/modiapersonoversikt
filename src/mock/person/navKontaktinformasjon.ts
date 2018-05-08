import { NavKontaktinformasjon } from '../../models/person/NAVKontaktinformasjon';
import { getSistOppdatert, vektetSjanse } from '../utils/mock-utils';
import FakerStatic = Faker.FakerStatic;

export function getNavKontaktinformasjon(faker: FakerStatic) {
    let kontaktinformasjon: NavKontaktinformasjon = {};

    if (vektetSjanse(faker, 0.7)) {
        kontaktinformasjon.mobil = {
            sistEndret: getSistOppdatert(),
            sistEndretAv: '1010800 BD03',
            nummer: faker.phone.phoneNumber('+479#######')
        };
    }

    if (vektetSjanse(faker, 0.3)) {
        kontaktinformasjon.jobbTelefon = {
            sistEndret: getSistOppdatert(),
            sistEndretAv: '1010800 BD03',
            nummer: faker.phone.phoneNumber('+44########')
        };
    }

    if (vektetSjanse(faker, 0.3)) {
        kontaktinformasjon.hjemTelefon = {
            sistEndret: getSistOppdatert(),
            sistEndretAv: '1010800 BD03',
            nummer: faker.phone.phoneNumber('+47########')
        };
    }

    return kontaktinformasjon;

}