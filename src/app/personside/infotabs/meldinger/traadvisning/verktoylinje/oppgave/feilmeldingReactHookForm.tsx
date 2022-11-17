import * as React from 'react';
import { FieldPath, FieldValues } from 'react-hook-form';

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
