import dayjs, { Dayjs } from 'dayjs';
import navfaker from 'nav-faker';
import { tilfeldigFodselsnummer } from '../../../utils/fnr-utils';
import { getPersonstatus } from '../../personMock';
import { lagNavn, getAlderFromFødselsnummer } from '../../../utils/person-utils';
import { Familierelasjon, Kjonn, Relasjonstype } from '../../../../models/person/person';

export function lagForeldre(barnetsAlder: Dayjs): Familierelasjon[] {
    let foreldre = [];
    if (navfaker.random.vektetSjanse(0.9)) {
        foreldre.push(lagForelder(barnetsAlder, Relasjonstype.Mor));
    }
    if (navfaker.random.vektetSjanse(0.9)) {
        foreldre.push(lagForelder(barnetsAlder, Relasjonstype.Far));
    }
    return foreldre;
}

function lagForelder(barnetsFødselsdato: Dayjs, relasjonstype: Relasjonstype) {
    const kjønn = relasjonstype === Relasjonstype.Mor ? Kjonn.Kvinne : Kjonn.Mann;
    const foreldersFødselsnummer = lagFødselsnummer(barnetsFødselsdato, kjønn);
    const alder = getAlderFromFødselsnummer(foreldersFødselsnummer);
    return {
        harSammeBosted: navfaker.random.vektetSjanse(0.9),
        rolle: relasjonstype,
        tilPerson: {
            navn: lagNavn(foreldersFødselsnummer),
            alder: alder,
            alderMåneder: alder * 12 + 3,
            fødselsnummer: foreldersFødselsnummer,
            personstatus: getPersonstatus(alder)
        }
    };
}

function lagFødselsnummer(barnetsFødselsdato: Dayjs, kjønn: Kjonn) {
    const minFødselsdato = barnetsFødselsdato.subtract(18, 'years');
    const absoluteMinDato = dayjs().subtract(100, 'years');
    const maxFødselsdato = absoluteMinDato.isBefore(minFødselsdato) ? absoluteMinDato : minFødselsdato;
    const fødselsdato = navfaker.dato.mellom(minFødselsdato.toDate(), maxFødselsdato.toDate());
    const foreldersFødselsnummer = tilfeldigFodselsnummer(fødselsdato, kjønn);
    return foreldersFødselsnummer;
}
