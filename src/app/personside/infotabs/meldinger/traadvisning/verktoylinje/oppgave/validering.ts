import { FieldState, Validator } from '@nutgaard/use-formstate';
import { erTall } from '../../../../../../../utils/string-utils';
import { removeWhitespaceAndDot, validerKontonummer } from '../../../../../../personsok/kontonummer/kontonummerUtils';

export function required(message: string): Validator<any> {
    return (value: string) => {
        if (!value) {
            return message;
        }
        return undefined;
    };
}

export function requiredToBeNumber(message: string): Validator<any> {
    return (value: string) => {
        if (!erTall(value)) {
            return message;
        }
        return undefined;
    };
}

export function requiredBosted(message: string): Validator<any> {
    return (value: string) => {
        if (!erTall(value) && value.length !== 4) {
            return message;
        }
        return undefined;
    };
}

export function requiredKontonummer(message: string): Validator<any> {
    return (value: string) => {
        if (!erTall(value) || validerKontonummer(removeWhitespaceAndDot(value))) {
            return message;
        }
        return undefined;
    };
}

export function notRequired(): Validator<any> {
    return (value: string) => {
        return undefined;
    };
}

export function feilmelding(field: FieldState): string | undefined {
    return field.touched ? field.error : undefined;
}
