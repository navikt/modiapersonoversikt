import { Postboksadresse } from '../../../../../models/personadresse';
import FormValidator from '../../../../../utils/forms/FormValidator';
import {
    datoErGyldigValidatorRegel,
    lagDatoErInnenEtÅrRegel,
    lagErIkkeTomtFeltRegel,
    lagPostboksnummerRegel,
    lagPostnummerRegel
} from '../../../../../utils/forms/commonValidatorRegler';

const postboksnummerObligatoriskRegel = lagErIkkeTomtFeltRegel(
    'postboksnummer',
    postboksadresse => postboksadresse.postboksnummer,
    'Postboksnummer kan ikke være tom'
);

const postboksnummerLengdeRegel = lagPostboksnummerRegel(
    'postboksnummer',
    postboksadresse => postboksadresse.postboksnummer
);

const datoGyldigRegel = datoErGyldigValidatorRegel<Postboksadresse>('periode', postboksadresse =>
    postboksadresse.periode ? postboksadresse.periode.til : ''
);

const datoErIfremtidenRegel = lagDatoErInnenEtÅrRegel<Postboksadresse>('periode', postboksadresse =>
    postboksadresse.periode ? postboksadresse.periode.til : ''
);

const postnummerRegel = lagPostnummerRegel('postnummer', postboksadresse => postboksadresse.postnummer);

export function validerPostboksadresse(postboksadresse: Postboksadresse) {
    const regler = [
        postboksnummerObligatoriskRegel,
        postboksnummerLengdeRegel,
        postnummerRegel,
        datoGyldigRegel,
        datoErIfremtidenRegel
    ];
    return new FormValidator<Postboksadresse>(regler).valider(postboksadresse);
}

export function getValidPostboksadresseForm(postboksadresse: Postboksadresse) {
    return new FormValidator<Postboksadresse>([]).valider(postboksadresse);
}
