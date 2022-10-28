import { FieldState, Validator } from '@nutgaard/use-formstate';
import * as React from 'react';
import { FormState } from 'react-hook-form';

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

export const feilmeldingReactHookForm = <F extends Record<string, any>>(formKey: keyof F, formState: FormState<F>) => {
    const { touchedFields, isSubmitted, errors } = formState;

    // @ts-ignore
    const touched = touchedFields[formKey];
    const error = errors[formKey];

    if ((touched || isSubmitted) && error) {
        return <>{error.message}</>;
    }
    return undefined;
};
