import { Valideringsregel } from './FormValidator';
import { erIkkeTomStreng, erTall } from '../string-utils';
import { erImorgenEllerSenere, erMaksEttÅrFramITid, isValidDate } from '../dateUtils';

export function lagPostnummerRegel<T>(key: keyof T, getPostnummer: (t: T) => string ): Valideringsregel<T>  {
    return {
        felt: key,
        feilmelding: 'Postnummer må ha fire tall',
        validator: (obj: T) => erTall(getPostnummer(obj)) && getPostnummer(obj).length === 4
    };
}

export function lagPostboksnummerRegel<T>(key: keyof T, getPostboksnummer: (t: T) => string ): Valideringsregel<T>  {
    return {
        felt: key,
        feilmelding: 'Postboksnummer kan maks ha 4 tall',
        validator: (obj: T) => erTall(getPostboksnummer(obj)) && getPostboksnummer(obj).length < 5
    };
}

export function lagErIkkeTomtFeltRegel<T>(key: keyof T, getFelt: (t: T) => string, feilmelding: string)
: Valideringsregel<T>  {
    return {
        felt: key,
        feilmelding: feilmelding,
        validator: (obj: T) => erIkkeTomStreng(getFelt(obj))
    };
}

export function datoErGyldigValidatorRegel<T>(key: keyof T, getGyldigTil: (t: T) => string ): Valideringsregel<T>  {
    return {
        felt: key,
        feilmelding: 'Ugyldig dato',
        validator: (obj: T) => isValidDate(getGyldigTil(obj))
    };
}

export function lagDatoErInnenEtÅrRegel<T>(key: keyof T, getGyldigTil: (t: T) => string ): Valideringsregel<T>  {
    return {
        felt: key,
        feilmelding: 'Dato må være etter idag og innen ett år',
        validator: (obj: T) =>
            isValidDate(getGyldigTil(obj)) &&
            erImorgenEllerSenere(new Date(getGyldigTil(obj))) &&
            erMaksEttÅrFramITid(new Date(getGyldigTil(obj)))
    };
}
