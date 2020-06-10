import { Fullmakt } from '../../models/person/fullmakter';
import moment from 'moment';

import { fyllRandomListe, vektetSjanse } from '../utils/mock-utils';
import NavFaker from 'nav-faker/dist/navfaker';
import { backendDatoformat } from '../../utils/dateUtils';

export function getMockFullmakter(faker: Faker.FakerStatic, navfaker: NavFaker): Fullmakt[] | undefined {
    if (vektetSjanse(faker, 0.5)) {
        return undefined;
    }
    return fyllRandomListe(() => getMockFullmakt(faker, navfaker), 2);
}

function getMockFullmakt(faker: Faker.FakerStatic, navfaker: NavFaker): Fullmakt {
    return {
        motpartsRolle: 'FULLMEKTIG',
        motpartsPersonident: navfaker.personIdentifikator.fødselsnummer(),
        motpartsPersonNavn: navfaker.navn.fornavn(),
        omraade: getOmraade(faker),
        gyldigFraOgMed: moment(faker.date.past(1)).format(backendDatoformat),
        gyldigTilOgMed: moment(faker.date.future(2)).format(backendDatoformat)
    };
}

function getOmraade(faker: Faker.FakerStatic): string[] {
    if (vektetSjanse(faker, 0.5)) {
        return ['*'];
    } else {
        return ['AAP', 'DAG'];
    }
}
