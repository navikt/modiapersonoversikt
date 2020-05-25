import { Validator } from '@nutgaard/use-formstate';
import { erTall } from '../../../../../../../utils/string-utils';
import { removeWhitespaceAndDot } from '../../../../../../personsok/kontonummer/kontonummerUtils';

export function required(message: string): Validator<any> {
    return (value: string) => {
        if (!value) {
            return message;
        }
        return undefined;
    };
}

export function requiredNumber(message: string): Validator<any> {
    return (value: string) => {
        if (!erTall(value) || !value) {
            return message;
        }
        return undefined;
    };
}

export function requiredBosted(message: string): Validator<any> {
    return (value: string) => {
        if (!erTall(value) || !value || value.length !== 4) {
            return message;
        }
        return undefined;
    };
}

export function requiredKontonummer(message: string): Validator<any> {
    return (value: string) => {
        if (!erTall(value) || !value || removeWhitespaceAndDot(value).length !== 11) {
            return message;
        }
        return undefined;
    };
}
