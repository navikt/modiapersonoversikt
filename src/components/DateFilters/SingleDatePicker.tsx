import { DatePicker, type DateValidationT, useDatepicker } from '@navikt/ds-react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useEffect } from 'react';

export const SingleDatePicker = ({
    date,
    label,
    onDateChange,
    onValidate,
    onInputChange,
    maxDate,
    minDate
}: {
    date: Dayjs | undefined;
    label: string;
    onDateChange: (val?: Date) => void;
    onValidate: (val: DateValidationT) => void;
    onInputChange?: (value: string) => void;
    maxDate?: Date;
    minDate?: Date;
}) => {
    const { datepickerProps, inputProps } = useDatepicker({
        defaultSelected: date?.toDate(),
        onDateChange,
        onValidate,
        toDate: maxDate,
        fromDate: minDate
    });

    const enhancedInputProps = {
        ...inputProps,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            onInputChange?.(e.target.value);
            inputProps.onChange?.(e);
        }
    };

    useEffect(() => {
        const selected = datepickerProps.selected ? dayjs(datepickerProps.selected as Date) : null;
        if (!selected?.isSame(date, 'day')) {
            inputProps?.onChange?.({
                target: { value: date ? date.format('DD.MM.YYYY') : '' }
            } as React.ChangeEvent<HTMLInputElement>);
        }
    }, [date]);

    return (
        <DatePicker {...datepickerProps} dropdownCaption>
            <DatePicker.Input size="small" {...enhancedInputProps} label={label} />
        </DatePicker>
    );
};
