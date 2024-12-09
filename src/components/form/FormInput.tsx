import { Input, type InputProps } from 'nav-frontend-skjema';
import type { FieldValues } from 'react-hook-form';
import type { FieldPath } from 'react-hook-form';
import type { FormElementProps } from './formTypes';
import { useFieldState } from './useFieldState';

interface Props<TFieldValues extends FieldValues, TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>
    extends FormElementProps<TFieldValues, TFieldName>,
        Omit<InputProps, 'name' | 'form'> {}

function FormInput<
    TFieldValues extends FieldValues,
    TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: Props<TFieldValues, TFieldName>) {
    const { ref, input, error } = useFieldState(props.name, props.form);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { form, name, ...inputProps } = props;

    return <Input inputRef={ref} {...inputProps} {...input} feil={props.feil || error} />;
}

export default FormInput;
