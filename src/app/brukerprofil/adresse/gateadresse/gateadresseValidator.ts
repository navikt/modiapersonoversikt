import { Gateadresse } from '../../../../models/personadresse';
import FormValidator, { Valideringsregel } from '../../../../utils/forms/FormValidator';
import { erIkkeTomStreng } from '../../../../utils/string-utils';

const regel: Valideringsregel<Gateadresse> = {
    felt: 'gatenavn',
    feilmelding: 'Gatenavn kan ikke være tom',
    validator: (gateadresse: Gateadresse) => erIkkeTomStreng(gateadresse.gatenavn)
};

export function validerGateadresse(gateadresse: Gateadresse) {
    return new FormValidator<Gateadresse>([regel]).valider(gateadresse);
}