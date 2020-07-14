import { FieldState, Validator } from '@nutgaard/use-formstate';
import * as React from 'react';

export function required(message: string): Validator<any> {
    return (value: string) => {
        if (!value) {
            return message;
        }
        return undefined;
    };
}

export function feilmelding(field: FieldState): React.ReactNode | undefined {
    return field.touched && field.error !== undefined ? <>{field.error}</> : undefined;
}
