import { Matrikkeladresse } from '../../../../../models/personadresse';
import FormValidator from '../../../../../utils/forms/FormValidator';
import { lagErIkkeTomtFeltRegel, lagPostnummerRegel } from '../../../../../utils/forms/commonValidatorRegler';

const eiendomsnavnRegel = lagErIkkeTomtFeltRegel<Matrikkeladresse>(
    'eiendomsnavn',
    (matrikkeladresse) => matrikkeladresse.eiendomsnavn ? matrikkeladresse.eiendomsnavn : '',
    'Områdeadresse kan ikke være tom');
const postnummerRegel = lagPostnummerRegel('postnummer', matrikkeladresse => matrikkeladresse.postnummer );

export function validerMatrikkeladresse(matrikkeladresse: Matrikkeladresse) {
    return new FormValidator<Matrikkeladresse>([eiendomsnavnRegel, postnummerRegel]).valider(matrikkeladresse);
}