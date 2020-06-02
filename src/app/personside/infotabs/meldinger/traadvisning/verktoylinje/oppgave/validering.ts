import { FieldState, Validator, Values } from '@nutgaard/use-formstate';
import { erTall } from '../../../../../../../utils/string-utils';
import { removeWhitespaceAndDot, validerKontonummer } from '../../../../../../personsok/kontonummer/kontonummerUtils';
import { PersonSokFormState } from '../../../../../../personsok/personsokUtils';

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

export function requiredGatenavn(): Validator<any> {
    return (value: string, values: Values<PersonSokFormState>) => {
        if (!value && values.husnummer) {
            return 'Gatenavn må være satt hvis husnummer er satt';
        }
        if (!value && values.husbokstav) {
            return 'Gatenavn må være satt hvis husbokstav er satt';
        }
        if (!value && values.postnummer) {
            return 'Gatenavn må være satt hvis postnummer er satt';
        }
        if (!value && !values.kontonummer && !values.fornavn) {
            return ' ';
        }
        return undefined;
    };
}

export function requiredKontonummer(message: string): Validator<any> {
    return (value: string, values: Values<PersonSokFormState>) => {
        if (!erTall(value) || validerKontonummer(removeWhitespaceAndDot(value))) {
            return message;
        }
        if (!value && !values.gatenavn && !values.fornavn) {
            return ' ';
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

export function minimumRequired(message: string): Validator<any> {
    return (value: string, values: Values<PersonSokFormState>) => {
        if (!values.kontonummer && !values.gatenavn && !values.fornavn) {
            return message;
        }
        return undefined;
    };
}
