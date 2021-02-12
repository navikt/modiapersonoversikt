import navfaker from 'nav-faker/dist/index';
import { Kjonn } from '../../models/person/person';

export function tilfeldigFodselsnummer(date: Date, kjønn?: Kjonn) {
    return navfaker.personIdentifikator.fødselsnummer(date, getKjønnstype(kjønn));
}

function getKjønnstype(kjønn?: Kjonn) {
    if (kjønn) {
        if (kjønn === Kjonn.Kvinne) {
            return 0;
        } else {
            return 1;
        }
    } else {
        return undefined;
    }
}
