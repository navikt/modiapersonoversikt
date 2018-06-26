import { Gateadresse } from '../../../../../models/personadresse';
import FormValidator, { Valideringsregel } from '../../../../../utils/forms/FormValidator';
import { erIkkeTomStreng, erTall } from '../../../../../utils/string-utils';

const gatenavnRegel: Valideringsregel<Gateadresse> = {
    felt: 'gatenavn',
    feilmelding: 'Gatenavn kan ikke være tom',
    validator: (gateadresse: Gateadresse) => erIkkeTomStreng(gateadresse.gatenavn)
};

const postnummerRegel: Valideringsregel<Gateadresse> = {
    felt: 'postnummer',
    feilmelding: 'Postnummer må ha fire tall',
    validator: (gateadresse: Gateadresse) => erTall(gateadresse.postnummer) && gateadresse.postnummer.length === 4
};

export function validerGateadresse(gateadresse: Gateadresse) {
    return new FormValidator<Gateadresse>([gatenavnRegel, postnummerRegel]).valider(gateadresse);
}

export function getValidGateadresseForm(gateadresse: Gateadresse) {
    return new FormValidator<Gateadresse>([]).valider(gateadresse);
}