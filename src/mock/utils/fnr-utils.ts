import *  as moment from 'moment';

import navfaker from 'nav-faker/dist/index';
import { Kjønn as Kjønnstyper } from 'nav-faker/dist/fodselsnummer/fodselsnummer';
import { Kjønn } from '../../models/person/person';
import FakerStatic = Faker.FakerStatic;

export function randomFodselsnummer(): string {
    return navfaker.fødselsnummer.generer();
}

export function seededTilfeldigFodselsnummer(seededFaker: FakerStatic,
                                             minAlder: number,
                                             maxAlder: number,
                                             kjønn?: Kjønn) {
    const fromDate = moment().subtract(maxAlder, 'years').toDate();
    const toDate = moment().subtract(minAlder, 'years').toDate();
    const tilfeldigFødselsdato = navfaker.dato.mellom(fromDate, toDate);
    return navfaker.fødselsnummer.generer({fødselsdato: tilfeldigFødselsdato, kjønn: getKjønnstype(kjønn)});
}

function getKjønnstype(kjønn?: Kjønn): Kjønnstyper | undefined {
    if (kjønn) {
        if (kjønn === Kjønn.Kvinne) {
            return Kjønnstyper.KVINNE;
        } else {
            return Kjønnstyper.MANN;
        }
    } else {
        return undefined;
    }
}