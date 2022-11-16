import { Textarea, TextareaProps } from 'nav-frontend-skjema';
import React from 'react';
import { FieldValues, FieldPath } from 'react-hook-form';
import { FormElementProps } from './formTypes';
import { useFieldState } from './useFieldState';

interface Props<TFieldValues extends FieldValues, TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>
    extends FormElementProps<TFieldValues, TFieldName>,
        Omit<TextareaProps, 'name' | 'form' | 'onChange' | 'value'> {}

function FormTextarea<
    TFieldValues extends FieldValues,
    TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: Props<TFieldValues, TFieldName>) {
    const { ref, input, error } = useFieldState(props.name, props.form);

    const { form, name, ...inputProps } = props;

    const value = form.watch(props.name);

    return <Textarea textareaRef={ref} {...inputProps} {...input} feil={error} value={value ?? ''} />;
}

export default FormTextarea;
