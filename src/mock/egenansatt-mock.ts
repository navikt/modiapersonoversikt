import * as faker from 'faker/locale/nb_NO';
import { vektetSjanse } from './utils/mock-utils';
import { Egenansatt } from '../models/egenansatt';
import { aremark } from './person/aremark';

export function erEgenAnsatt(fødselsnummer: String): Egenansatt {
    if (fødselsnummer === aremark.fødselsnummer) {
        return { erEgenAnsatt: false };
    }
    return { erEgenAnsatt : getEgenAnsattMarkering() };
}

function getEgenAnsattMarkering(): boolean {
    if (vektetSjanse(faker, 0.1)) {
        return true;
    } else {
        return false;
    }
}