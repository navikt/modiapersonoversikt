import { Fullmakt, FullmaktsRolle } from '../../models/personPdl/fullmakt';
import { fyllRandomListe, vektetSjanse } from '../utils/mock-utils';
import NavFaker from 'nav-faker/dist/navfaker';

export function getMockFullmakter(faker: Faker.FakerStatic, navfaker: NavFaker): Fullmakt[] {
    return fyllRandomListe(() => getMockFullmakt(faker, navfaker), 2);
}

function getMockFullmakt(faker: Faker.FakerStatic, navfaker: NavFaker): Fullmakt {
    return {
        motpartsPersonident: navfaker.personIdentifikator.fødselsnummer(),
        motpartsPersonNavn: {
            fornavn: navfaker.navn.fornavn(),
            mellomnavn: null,
            etternavn: 'Etternavn'
        },
        motpartsRolle: FullmaktsRolle.Fullmektig,
        omraade: getOmraade(faker),
        gyldigFraOgMed: new Date(faker.date.past(1)),
        gyldigTilOgMed: new Date(faker.date.future(2))
    };
}

function getOmraade(faker: Faker.FakerStatic): string[] {
    if (vektetSjanse(faker, 0.5)) {
        return ['*'];
    } else {
        return ['AAP', 'DAG'];
    }
}
