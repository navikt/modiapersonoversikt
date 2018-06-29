import { Postboksadresse } from '../../../../../models/personadresse';
import FormValidator from '../../../../../utils/forms/FormValidator';
import { lagGyldigTilRegel, lagPostnummerRegel } from '../../../../../utils/forms/commonValidatorRegler';

const gyldigTilRegel = lagGyldigTilRegel<Postboksadresse>('periode', postboksadresse =>
    postboksadresse.periode ? postboksadresse.periode.til : '');

const postnummerRegel = lagPostnummerRegel('postnummer', postboksadresse =>
    postboksadresse.postnummer );

export function validerPostboksadresse(postboksadresse: Postboksadresse) {
    return new FormValidator<Postboksadresse>([postnummerRegel, gyldigTilRegel]).valider(postboksadresse);
}

export function getValidPostboksadresseForm(postboksadresse: Postboksadresse) {
    return new FormValidator<Postboksadresse>([]).valider(postboksadresse);
}