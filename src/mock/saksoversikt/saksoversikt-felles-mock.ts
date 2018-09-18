import NavFaker from 'nav-faker/dist/navfaker';
import { Baksystem, Saksdato } from '../../models/saksoversikt/fellesSak';
import { vektetSjanse } from '../utils/mock-utils';
import FakerStatic = Faker.FakerStatic;

export function getSaksdato(navfaker: NavFaker): Saksdato {
    return {
        år: navfaker.random.integer(2018, 2016),
        måned: navfaker.random.integer(12, 1),
        dag: navfaker.random.integer(28, 1),
        time: navfaker.random.integer(23, 1),
        minutt: navfaker.random.integer(59, 1),
        sekund: navfaker.random.integer(59, 1)
    };
}

export function getBaksystem(faker: FakerStatic): Baksystem {
    if (vektetSjanse(faker, 0.1)) {
        return Baksystem.Aktoer;
    } else if (vektetSjanse(faker, 0.1)) {
        return Baksystem.Gsak;
    } else if (vektetSjanse(faker, 0.1)) {
        return Baksystem.Henvendelse;
    } else if (vektetSjanse(faker, 0.1)) {
        return Baksystem.Joark;
    } else if (vektetSjanse(faker, 0.1)) {
        return Baksystem.JoarkSikkerhetsbegrensning;
    } else if (vektetSjanse(faker, 0.1)) {
        return Baksystem.Kodeverk;
    } else if (vektetSjanse(faker, 0.1)) {
        return Baksystem.PdfKonvertering;
    } else if (vektetSjanse(faker, 0.1)) {
        return Baksystem.Pesys;
    } else {
        return Baksystem.SakOgBehandling;
    }
}