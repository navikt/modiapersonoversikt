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
    const { form, name, children, ...selectProps } = props;

    const { ref, input, error } = useFieldState(name, form);

    return (
        <Select selectRef={ref as any} {...input} {...selectProps} feil={error}>
            {children}
        </Select>
    );
}

export default FormSelect;
