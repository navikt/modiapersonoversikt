import navfaker from 'nav-faker/dist/index';
import { Kjønn as Kjønnstyper } from 'nav-faker/dist/fodselsnummer/fodselsnummer';
import { Kjønn } from '../../models/person/person';

export function tilfeldigFodselsnummer(date: Date, kjønn?: Kjønn) {
    return navfaker.fødselsnummer.generer({fødselsdato: date, kjønn: getKjønnstype(kjønn)});
}

function getKjønnstype(kjønn?: Kjønn): Kjønnstyper | undefined {
    if (kjønn) {
        if (kjønn === Kjønn.Kvinne) {
            return 0;
        } else {
            return 1;
        }
    } else {
        return undefined;
    }
}