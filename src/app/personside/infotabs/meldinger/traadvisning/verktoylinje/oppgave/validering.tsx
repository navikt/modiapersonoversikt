import { FieldState, Validator } from '@nutgaard/use-formstate';
import * as React from 'react';
import { FieldPath, FieldValues } from 'react-hook-form';

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

export const feilmeldingReactHookForm = <
    TFieldValues extends FieldValues,
    TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
    { formState }: FieldValues,
    formKey: TFieldName
) => {
    const { touchedFields, isSubmitted, errors } = formState;

    const touched = touchedFields[formKey];
    const error = errors[formKey];

    if ((touched || isSubmitted) && error) {
        return <>{error.message}</>;
    }
    return undefined;
};
