import * as moment from 'moment';
import { Moment } from 'moment';

import navfaker from 'nav-faker';

import { tilfeldigFodselsnummer } from '../../../utils/fnr-utils';
import { getPersonstatus } from '../../personMock';
import { lagNavn } from '../../../utils/person-utils';
import { Familierelasjon, Kjønn, Relasjonstype } from '../../../../models/person/person';
import { getAlderFromFødselsnummer } from '../../../../utils/dateUtils';

export function lagForeldre(barnetsAlder: Moment): Familierelasjon[] {
    let foreldre = [];
    if (navfaker.random.vektetSjanse(0.9)) {
        foreldre.push(lagForelder(barnetsAlder, Relasjonstype.Mor));
    }
    if (navfaker.random.vektetSjanse(0.9)) {
        foreldre.push(lagForelder(barnetsAlder, Relasjonstype.Far));
    }
    return foreldre;
}

function lagForelder(barnetsFødselsdato: Moment, relasjonstype: Relasjonstype) {
    const kjønn = relasjonstype === Relasjonstype.Mor ? Kjønn.Kvinne : Kjønn.Mann;
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

function lagFødselsnummer(barnetsFødselsdato: moment.Moment, kjønn: Kjønn) {
    const minFødselsdato = barnetsFødselsdato.subtract(18, 'years');
    const maxFødselsdato = moment.min(minFødselsdato, moment().subtract(100, 'years'));
    const fødselsdato = navfaker.dato.mellom(minFødselsdato.toDate(), maxFødselsdato.toDate());
    const foreldersFødselsnummer = tilfeldigFodselsnummer(fødselsdato, kjønn);
    return foreldersFødselsnummer;
}
