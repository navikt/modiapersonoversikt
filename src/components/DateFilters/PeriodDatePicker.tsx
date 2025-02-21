import { DatePicker, ErrorMessage, HStack, useDatepicker } from '@navikt/ds-react';
import dayjs, { type Dayjs } from 'dayjs';
import { useMemo, useState } from 'react';
import type { DateRange } from './types';

type Props = {
    onUpdate: (change: DateRange) => void;
    period?: DateRange;
};

function PeriodDatePicker(props: Props) {
    const periodeValidering = useMemo(
        () => [
            {
                erUgyldig(fra: Dayjs, til: Dayjs) {
                    return !fra.isValid() || !til.isValid();
                },
                feilmelding: 'Du må velge gyldig fra og til dato. Gyldig datoformat er dd.mm.åååå'
            },
            {
                erUgyldig(fra: Dayjs, til: Dayjs) {
                    return fra.isAfter(til);
                },
                feilmelding: 'Fra-dato kan ikke være senere enn til-dato'
            }
        ],
        []
    );

    const [fromDate, setFromDate] = useState(dayjs(props.period?.from));
    const [toDate, setToDate] = useState(dayjs(props.period?.to));
    const [periodeFeilmelding, setPeriodeFeilmelding] = useState<string | undefined>();

    const onFromDateChange = (val?: Date) => {
        const value = dayjs(val);
        setFromDate(value);
        onRangeDateChange(value, toDate);
    };

    const onToDateChange = (val?: Date) => {
        const value = dayjs(val);
        setToDate(value);
        onRangeDateChange(fromDate, value);
    };

    const onRangeDateChange = (from?: Dayjs, to?: Dayjs) => {
        const error = getDateError(from, to);
        if (!error && from && to) {
            setPeriodeFeilmelding(undefined);
            const newPeriode: DateRange = { from, to };
            props.onUpdate(newPeriode);
        } else {
            setPeriodeFeilmelding(error);
        }
    };

    const { datepickerProps: fromDatepickerProps, inputProps: fromInputProps } = useDatepicker({
        defaultSelected: fromDate.toDate(),
        onDateChange: onFromDateChange
    });

    const { datepickerProps: toDatepickerProps, inputProps: toInputProps } = useDatepicker({
        defaultSelected: toDate.toDate(),
        onDateChange: onToDateChange
    });

    const getDateError = (from?: Dayjs, to?: Dayjs) => {
        if (!from || !to) return;
        return periodeValidering.find((validering) => validering.erUgyldig(from, to))?.feilmelding;
    };

    const minFromDate = dayjs().subtract(10, 'year').startOf('year').toDate();
    const maxToDate = dayjs().toDate();

    const maxFromDate = toDate ? toDate.subtract(1, 'day').toDate() : toDate;
    const minToDate = fromDate ? fromDate.add(1, 'day').toDate() : fromDate;

    return (
        <>
            <HStack gap="2">
                <DatePicker
                    {...fromDatepickerProps}
                    strategy="fixed"
                    dropdownCaption={true}
                    fromDate={minFromDate}
                    toDate={maxFromDate}
                >
                    <DatePicker.Input {...fromInputProps} size={'small'} label="Fra" />
                </DatePicker>
                <DatePicker
                    {...toDatepickerProps}
                    strategy="fixed"
                    dropdownCaption={true}
                    fromDate={minToDate}
                    toDate={maxToDate}
                >
                    <DatePicker.Input {...toInputProps} size={'small'} label="Til" />
                </DatePicker>
            </HStack>
            {periodeFeilmelding && <ErrorMessage>{periodeFeilmelding}</ErrorMessage>}
        </>
    );
}

export default PeriodDatePicker;
