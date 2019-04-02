import navfaker from 'nav-faker';

import { Egenansatt } from '../models/egenansatt';
import { aremark } from './person/aremark';

export function erEgenAnsatt(fødselsnummer: string): Egenansatt {
    if (fødselsnummer === aremark.fødselsnummer) {
        return { erEgenAnsatt: false };
    }
    navfaker.seed(fødselsnummer);
    return { erEgenAnsatt: navfaker.random.vektetSjanse(0.1) };
}
