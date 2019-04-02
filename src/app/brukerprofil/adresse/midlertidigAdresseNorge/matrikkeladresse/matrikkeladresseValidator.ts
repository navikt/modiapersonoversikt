import { Matrikkeladresse } from '../../../../../models/personadresse';
import FormValidator from '../../../../../utils/forms/FormValidator';
import {
    lagDatoErInnenEtÅrRegel,
    lagErIkkeTomtFeltRegel,
    lagPostnummerRegel
} from '../../../../../utils/forms/commonValidatorRegler';

const eiendomsnavnRegel = lagErIkkeTomtFeltRegel<Matrikkeladresse>(
    'eiendomsnavn',
    matrikkeladresse => (matrikkeladresse.eiendomsnavn ? matrikkeladresse.eiendomsnavn : ''),
    'Områdeadresse kan ikke være tom'
);
const postnummerRegel = lagPostnummerRegel('postnummer', matrikkeladresse => matrikkeladresse.postnummer);
const gyldigTilRegel = lagDatoErInnenEtÅrRegel<Matrikkeladresse>('periode', matrikkeladresse =>
    matrikkeladresse.periode ? matrikkeladresse.periode.til : ''
);

export function validerMatrikkeladresse(matrikkeladresse: Matrikkeladresse) {
    const regler = [eiendomsnavnRegel, postnummerRegel, gyldigTilRegel];
    return new FormValidator<Matrikkeladresse>(regler).valider(matrikkeladresse);
}

export function getValidMatrikkeladresseForm(matrikkeladresse: Matrikkeladresse) {
    return new FormValidator<Matrikkeladresse>([]).valider(matrikkeladresse);
}
