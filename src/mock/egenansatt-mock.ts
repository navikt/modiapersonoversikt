import * as faker from 'faker/locale/nb_NO';
import {vektetSjanse} from './utils/mock-utils';
import { Egenansatt } from '../models/egenansatt';

export function erEgenAnsatt(fødselsnummer: String) : Egenansatt {
    return {erEgenAnsatt : getEgenAnsattMarkering()}
}

function getEgenAnsattMarkering(): Boolean {
    if(vektetSjanse(faker, 0.9)) {
        return true
    } else {
        return false;
    }
}