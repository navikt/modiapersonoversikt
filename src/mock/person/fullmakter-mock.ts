import { Fullmakt } from '../../models/person/fullmakter';
import dayjs from 'dayjs';
import { fyllRandomListe, vektetSjanse } from '../utils/mock-utils';
import NavFaker from 'nav-faker/dist/navfaker';
import { backendDatoformat } from '../../utils/date-utils';

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
        gyldigFraOgMed: dayjs(faker.date.past(1)).format(backendDatoformat),
        gyldigTilOgMed: dayjs(faker.date.future(2)).format(backendDatoformat)
    };
}

function getOmraade(faker: Faker.FakerStatic): string[] {
    if (vektetSjanse(faker, 0.5)) {
        return ['*'];
    } else {
        return ['AAP', 'DAG'];
    }
}
