import { DatePicker, type DateValidationT, useDatepicker } from '@navikt/ds-react';

// Ekstraherer Aksel datepicker for gjenbruk og å kunne re-rendre ved ekstern datoendring
// For å få datoen til å endre seg ved re-rendering, bruk key prop ved bruk av komponenten
export const SingleDatePicker = ({
    date,
    label,
    onDateChange,
    onValidate
}: {
    date: Date;
    label: string;
    onDateChange: (val?: Date) => void;
    onValidate: (val: DateValidationT) => void;
}) => {
    const { datepickerProps, inputProps } = useDatepicker({
        defaultSelected: date,
        onDateChange,
        onValidate
    });

    return (
        <DatePicker {...datepickerProps} dropdownCaption>
            <DatePicker.Input size="small" {...inputProps} label={label} />
        </DatePicker>
    );
};
