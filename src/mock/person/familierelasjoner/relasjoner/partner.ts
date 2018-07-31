import FakerStatic = Faker.FakerStatic;
import navfaker from 'nav-faker';
import { vektetSjanse } from '../../../utils/mock-utils';
import { getPersonstatus } from '../../personMock';
import { lagNavn } from '../../../utils/person-utils';
import { Familierelasjon, Relasjonstype } from '../../../../models/person/person';
import { getAlderFromFødselsnummer } from '../../../../utils/dateUtils';

export function lagPartner(faker: FakerStatic, relasjonstype: Relasjonstype): Familierelasjon {
    const partnersFødselsnummer = navfaker.fødselsnummer.myndig();
    const alder = getAlderFromFødselsnummer(partnersFødselsnummer);
    return {
        harSammeBosted: vektetSjanse(faker, 0.9),
        rolle: relasjonstype,
        tilPerson: {
            navn: lagNavn(faker),
            alder: alder,
            alderMåneder: alder * 12 + 2,
            fødselsnummer: partnersFødselsnummer,
            personstatus: getPersonstatus(alder)
        }
    };
}
