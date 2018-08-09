import navfaker from 'nav-faker/dist/index';
import { Kjønn } from '../../models/person/person';

export function tilfeldigFodselsnummer(date: Date, kjønn?: Kjønn) {
    return navfaker.personIdentifikator.fødselsnummer(date, getKjønnstype(kjønn));
}

function getKjønnstype(kjønn?: Kjønn) {
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