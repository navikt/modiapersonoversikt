import { ChangeEvent } from 'react';
import Datepicker, { DatepickerProps } from 'nav-datovelger/lib/Datepicker';
import { FieldPath, FieldValues } from 'react-hook-form';
import { FormElementProps } from './formTypes';
import { useFieldState } from './useFieldState';

interface Props<TFieldValues extends FieldValues, TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>
    extends FormElementProps<TFieldValues, TFieldName>,
        Omit<DatepickerProps, 'name' | 'form' | 'onChange'> {}

function FormDatePicker<
    TFieldValues extends FieldValues,
    TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: Props<TFieldValues, TFieldName>) {
    const { form, name, ...datePickerProps } = props;

    const {
        input: { onChange, ...input },
        error
    } = useFieldState(name, form);

    return (
        <Datepicker
            inputId={input.id}
            inputProps={{ name: props.name, 'aria-invalid': !!error }}
            onChange={(value) => {
                const target = { name, value };
                const event = { target, currentTarget: target } as unknown as ChangeEvent<HTMLInputElement>;
                onChange(event);
            }}
            {...input}
            {...datePickerProps}
        />
    );
}

export default FormDatePicker;
