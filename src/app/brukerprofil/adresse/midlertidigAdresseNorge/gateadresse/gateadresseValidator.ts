import { Gateadresse } from '../../../../../models/personadresse';
import FormValidator from '../../../../../utils/forms/FormValidator';
import {
    datoErIfremtidenValidatorRegel,
    lagErIkkeTomtFeltRegel,
    lagPostnummerRegel
} from '../../../../../utils/forms/commonValidatorRegler';

const gatenavnRegel = lagErIkkeTomtFeltRegel(
    'gatenavn',
    gateadresse => gateadresse.gatenavn, 'Gatenavn kan ikke være tom');
const postnummerRegel = lagPostnummerRegel('postnummer', gateadresse => gateadresse.postnummer );
const gyldigTilRegel = datoErIfremtidenValidatorRegel<Gateadresse>('periode', gateadresse =>
    gateadresse.periode ? gateadresse.periode.til : '');

export function validerGateadresse(gateadresse: Gateadresse) {
    return new FormValidator<Gateadresse>([gatenavnRegel, postnummerRegel, gyldigTilRegel]).valider(gateadresse);
}

export function getValidGateadresseForm(gateadresse: Gateadresse) {
    return new FormValidator<Gateadresse>([]).valider(gateadresse);
}