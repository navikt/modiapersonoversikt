import NavFaker from 'nav-faker/dist/navfaker';
import { Baksystem, Saksdato } from '../../models/saksoversikt/fellesSak';

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

export function getBaksystem(navfaker: NavFaker): Baksystem {
    return navfaker.random.arrayElement([
        Baksystem.SakOgBehandling,
        Baksystem.Pesys,
        Baksystem.PdfKonvertering,
        Baksystem.Kodeverk,
        Baksystem.JoarkSikkerhetsbegrensning,
        Baksystem.Joark,
        Baksystem.Henvendelse,
        Baksystem.Gsak,
        Baksystem.Aktoer
    ]);
}
