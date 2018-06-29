import { Valideringsregel } from './FormValidator';
import { erIkkeTomStreng, erTall } from '../string-utils';
import { isValidDate } from '../dateUtils';

export function lagPostnummerRegel<T>(key: keyof T, getPostnummer: (t: T) => string ): Valideringsregel<T>  {
    return {
        felt: key,
        feilmelding: 'Postnummer må ha fire tall',
        validator: (obj: T) => erTall(getPostnummer(obj)) && getPostnummer(obj).length === 4
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

export function lagGyldigTilRegel<T>(key: keyof T, getGyldigTil: (t: T) => string ): Valideringsregel<T>  {
    return {
        felt: key,
        feilmelding: 'Ugyldig dato',
        validator: (obj: T) => isValidDate(getGyldigTil(obj))
    };
}