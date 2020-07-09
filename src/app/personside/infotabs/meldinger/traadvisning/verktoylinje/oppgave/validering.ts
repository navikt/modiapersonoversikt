import { FieldState, Validator } from '@nutgaard/use-formstate';

export function required(message: string): Validator<any> {
    return (value: string) => {
        if (!value) {
            return message;
        }
        return undefined;
    };
}

export function feilmelding(field: FieldState): string | undefined {
    return field.touched ? field.error : undefined;
}
