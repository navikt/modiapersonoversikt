import React from 'react';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import { FieldPath } from 'react-hook-form/dist/types/path';
import { FormElementProps } from './formTypes';
import { Select, SelectProps } from 'nav-frontend-skjema';
import { useFieldState } from './useFieldState';

interface Props<TFieldValues extends FieldValues, TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>
    extends FormElementProps<TFieldValues, TFieldName>,
        Omit<SelectProps, 'name' | 'form'> {}

function FormSelect<
    TFieldValues extends FieldValues,
    TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: Props<TFieldValues, TFieldName>) {
    const { ref, input, error } = useFieldState(props.name, props.form);

    const { form, name, ...selectProps } = props;

    return (
        <Select selectRef={ref as any} {...selectProps} {...input} feil={error}>
            {props.children}
        </Select>
    );
}

export default FormSelect;
