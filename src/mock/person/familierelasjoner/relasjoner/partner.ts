import navfaker from 'nav-faker';

import { getPersonstatus } from '../../personMock';
import { lagNavn } from '../../../utils/person-utils';
import { Familierelasjon, Relasjonstype } from '../../../../models/person/person';
import { getAlderFromFødselsnummer } from '../../../../utils/dateUtils';

export function lagPartner(relasjonstype: Relasjonstype): Familierelasjon {
    const partnersFødselsnummer = navfaker.personIdentifikator.myndigFødselsnummer();
    const alder = getAlderFromFødselsnummer(partnersFødselsnummer);
    return {
        harSammeBosted: navfaker.random.vektetSjanse(0.9),
        rolle: relasjonstype,
        tilPerson: {
            navn: lagNavn(partnersFødselsnummer),
            alder: alder,
            alderMåneder: alder * 12 + 2,
            fødselsnummer: partnersFødselsnummer,
            personstatus: getPersonstatus(alder)
        }
    };
}
