import { DatePicker, type DateValidationT, useDatepicker } from '@navikt/ds-react';
import dayjs from 'dayjs';
import { useEffect } from 'react';

export const SingleDatePicker = ({
    date,
    label,
    onDateChange,
    onValidate,
    maxDate,
    minDate
}: {
    date: Date | undefined;
    label: string;
    onDateChange: (val?: Date) => void;
    onValidate: (val: DateValidationT) => void;
    maxDate?: Date;
    minDate?: Date;
}) => {
    const { datepickerProps, inputProps } = useDatepicker({
        defaultSelected: date,
        onDateChange,
        onValidate,
        toDate: maxDate,
        fromDate: minDate
    });

    useEffect(() => {
        if (date === undefined) {
            inputProps?.onChange?.({
                target: { value: '' }
            } as React.ChangeEvent<HTMLInputElement>);
            return;
        }
        if (datepickerProps.selected?.toString() !== date.toString()) {
            inputProps?.onChange?.({
                target: { value: dayjs(date).format('DD.MM.YYYY') }
            } as React.ChangeEvent<HTMLInputElement>);
        }
    }, [date]);

    return (
        <DatePicker {...datepickerProps} dropdownCaption>
            <DatePicker.Input size="small" {...inputProps} label={label} />
        </DatePicker>
    );
};
