import React from 'react';
import { DatepickerLimitations, Datepicker } from 'nav-datovelger';
import { ChangeEvent } from 'react';
import { DatepickerProps } from 'nav-datovelger/lib/Datepicker';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { PersonSokFormStateV3 } from '../personsokUtils';

interface Props<F extends FieldValues = PersonSokFormStateV3> {
    id: keyof F;
    register: UseFormRegister<F>;
    value?: string;
    showYearSelector: boolean;
    limitations?: DatepickerLimitations;
    hasError: boolean;
}

type OriginalOnChange = DatepickerProps['onChange'];

const useTransformDatepickerProps = ({
    register,
    showYearSelector,
    limitations,
    id,
    value,
    hasError
}: Props): DatepickerProps => {
    const { name, onChange: onChangeCallback, ref: _, ...rest } = register(id);

    const onChange: OriginalOnChange = (value) => {
        const target = { name, value } as HTMLInputElement;
        const event = { target, currentTarget: target } as ChangeEvent<HTMLInputElement>;
        onChangeCallback(event);
    };

    return {
        inputId: id,
        inputProps: {
            name,
            'aria-invalid': hasError
        },
        showYearSelector,
        value,
        limitations,
        onChange,
        ...rest
    };
};

export function CustomDatovelger(props: Props) {
    const transformedProps = useTransformDatepickerProps(props);
    return <Datepicker {...transformedProps} />;
}
