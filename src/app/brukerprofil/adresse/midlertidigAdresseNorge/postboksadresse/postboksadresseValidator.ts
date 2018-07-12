import { Postboksadresse } from '../../../../../models/personadresse';
import FormValidator from '../../../../../utils/forms/FormValidator';
import {
    datoErGyldigValidatorRegel, lagDatoErInnenEtÅrRegel, lagErIkkeTomtFeltRegel,
    lagPostnummerRegel
} from '../../../../../utils/forms/commonValidatorRegler';

const postboksnummerRegel = lagErIkkeTomtFeltRegel(
    'postboksnummer',
    postboksadresse => postboksadresse.postboksnummer, 'Postboksnummer kan ikke være tom');

const datoGyldigRegel = datoErGyldigValidatorRegel<Postboksadresse>('periode', postboksadresse =>
    postboksadresse.periode ? postboksadresse.periode.til : '');

const datoErIfremtidenRegel = lagDatoErInnenEtÅrRegel<Postboksadresse>('periode', postboksadresse =>
    postboksadresse.periode ? postboksadresse.periode.til : '');

const postnummerRegel = lagPostnummerRegel('postnummer', postboksadresse =>
    postboksadresse.postnummer );

export function validerPostboksadresse(postboksadresse: Postboksadresse) {
    const regler = [postboksnummerRegel, postnummerRegel, datoGyldigRegel, datoErIfremtidenRegel];
    return new FormValidator<Postboksadresse>(regler).valider(postboksadresse);
}

export function getValidPostboksadresseForm(postboksadresse: Postboksadresse) {
    return new FormValidator<Postboksadresse>([]).valider(postboksadresse);
}