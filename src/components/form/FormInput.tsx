import React from 'react';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import { FieldPath } from 'react-hook-form/dist/types/path';
import { Input, InputProps } from 'nav-frontend-skjema';
import { FormElementProps } from './formTypes';
import { useFieldState } from './useFieldState';

interface Props<TFieldValues extends FieldValues, TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>
    extends FormElementProps<TFieldValues, TFieldName>,
        Omit<InputProps, 'name' | 'form'> {}

function FormInput<
    TFieldValues extends FieldValues,
    TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: Props<TFieldValues, TFieldName>) {
    const { ref, input, error } = useFieldState(props.name, props.form);

    const { form, name, ...inputProps } = props;

    return <Input inputRef={ref} {...inputProps} {...input} feil={props.feil || error} />;
}

export default FormInput;
