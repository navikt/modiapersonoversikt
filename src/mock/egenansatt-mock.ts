import navfaker from 'nav-faker';

import { Egenansatt } from '../models/egenansatt';
import { aremark } from './person/aremark';

export function erEgenAnsatt(fødselsnummer: String): Egenansatt {
    if (fødselsnummer === aremark.fødselsnummer) {
        return { erEgenAnsatt: false };
    }
    return { erEgenAnsatt : navfaker.random.vektetSjanse(0.1) };
}
