import { Postboksadresse } from '../../../../../models/personadresse';
import FormValidator, { Valideringsregel } from '../../../../../utils/forms/FormValidator';
import { lagPostnummerRegel } from '../../../../../utils/forms/commonValidatorRegler';
import { isValidDate } from '../../../../../utils/dateUtils';

export function lagGyldigTilRegel<T>(key: keyof T, getGyldigTil: (t: T) => string ): Valideringsregel<T>  {
    return {
        felt: key,
        feilmelding: 'Ugyldig dato',
        validator: (obj: T) => isValidDate(getGyldigTil(obj))
    };
}

const gyldigTilRegel = lagGyldigTilRegel<Postboksadresse>('periode', postboksadresse =>
    postboksadresse.periode ? postboksadresse.periode.til : '');

const valideringsregel = lagPostnummerRegel('postnummer', postboksadresse =>
    postboksadresse.postnummer );

export function validerPostboksadresse(postboksadresse: Postboksadresse) {
    return new FormValidator<Postboksadresse>([valideringsregel, gyldigTilRegel]).valider(postboksadresse);
}

export function getValidPostboksadresseForm(postboksadresse: Postboksadresse) {
    return new FormValidator<Postboksadresse>([]).valider(postboksadresse);
}