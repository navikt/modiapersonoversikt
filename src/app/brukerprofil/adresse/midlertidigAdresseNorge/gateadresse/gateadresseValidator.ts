import { Gateadresse } from '../../../../../models/personadresse';
import FormValidator from '../../../../../utils/forms/FormValidator';
import { lagErIkkeTomtFeltRegel, lagPostnummerRegel } from '../../../../../utils/forms/commonValidatorRegler';

const gatenavnRegel = lagErIkkeTomtFeltRegel(
    'gatenavn',
    gateadresse => gateadresse.gatenavn, 'Gatenavn kan ikke være tom');
const valideringsregel = lagPostnummerRegel('postnummer', gateadresse => gateadresse.postnummer );

export function validerGateadresse(gateadresse: Gateadresse) {
    return new FormValidator<Gateadresse>([gatenavnRegel, valideringsregel]).valider(gateadresse);
}