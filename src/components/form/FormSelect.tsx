import { Select, type SelectProps } from 'nav-frontend-skjema';
import type { FieldValues } from 'react-hook-form';
import type { FieldPath } from 'react-hook-form';
import type { FormElementProps } from './formTypes';
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
        //biome-ignore lint/suspicious/noExplicitAny: biome migration
        <Select selectRef={ref as any} {...input} {...selectProps} feil={error}>
            {children}
        </Select>
    );
}

export default FormSelect;
