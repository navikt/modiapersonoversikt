import { CalendarIcon } from '@navikt/aksel-icons';
import { Button, DatePicker, ErrorMessage, HStack, Modal, TextField, VStack, useDatepicker } from '@navikt/ds-react';
import dayjs, { type Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { type ChangeEvent, useEffect, useMemo, useState } from 'react';
import useDebounce from 'src/utils/hooks/use-debounce';
import type { DateRange } from './types';

dayjs.extend(customParseFormat);

type Props = {
    onUpdate: (change: DateRange) => void;
    period?: DateRange;
};

const dateToString = (date?: Dayjs) => {
    return date?.format('DD.MM.YYYY') ?? '';
};

const stringToDate = (dateString: string) => {
    return dayjs(dateString, 'DD.MM.YYYY', true);
};

function PeriodDatePicker(props: Props) {
    const [fromModalOpen, setFromModalOpen] = useState(false);
    const [toModalOpen, setToModalOpen] = useState(false);

    const [fromDate, setFromDate] = useState(dayjs(props.period?.from));
    const [toDate, setToDate] = useState(dayjs(props.period?.to));

    const [fromDateKeyboardInput, setFromDateKeyboardInput] = useState<string>(dateToString(props.period?.from));
    const [toDateKeyboardInput, setToDateKeyboardInput] = useState<string>(dateToString(props.period?.to));

    const debouncedFromDate = useDebounce(fromDateKeyboardInput, 300);
    const debouncedToDate = useDebounce(toDateKeyboardInput, 300);

    const [periodeFeilmelding, setPeriodeFeilmelding] = useState<string | undefined>();

    const minFromDate = dayjs().subtract(10, 'year').startOf('year').toDate();
    const maxToDate = dayjs().toDate();

    const maxFromDate = toDate ? toDate.subtract(1, 'day').toDate() : toDate;
    const minToDate = fromDate ? fromDate.add(1, 'day').toDate() : fromDate;

    const periodeValidering = useMemo(
        () => [
            {
                erUgyldig(fra: Dayjs, til: Dayjs) {
                    return !fra.isValid() || !til.isValid();
                },
                feilmelding: 'Du må velge gyldig fra- og til-dato. Gyldig datoformat er dd.mm.åååå'
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

    useEffect(() => {
        if (!debouncedFromDate || !stringToDate(debouncedFromDate).isValid()) return;
        const event = { target: { value: debouncedFromDate } } as ChangeEvent<HTMLInputElement>;
        fromInputProps?.onChange?.(event);
    }, [debouncedFromDate]);

    useEffect(() => {
        if (!debouncedToDate || !stringToDate(debouncedToDate).isValid()) return;
        const event = { target: { value: debouncedToDate } } as ChangeEvent<HTMLInputElement>;
        toInputProps?.onChange?.(event);
    }, [debouncedToDate]);

    const onFromDateChange = (val?: Date) => {
        const dateValue = dayjs(val);
        setFromDate(dateValue);
        setFromDateKeyboardInput(dateToString(dateValue));
        onRangeDateChange(dateValue, toDate);
        setFromModalOpen(false);
    };

    const onToDateChange = (val?: Date) => {
        const dateValue = dayjs(val);
        setToDate(dateValue);
        setToDateKeyboardInput(dateToString(dateValue));
        onRangeDateChange(fromDate, dateValue);
        setToModalOpen(false);
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

    const getDateError = (from?: Dayjs, to?: Dayjs) => {
        if (!from || !to) return;
        return periodeValidering.find((validering) => validering.erUgyldig(from, to))?.feilmelding;
    };

    const { datepickerProps: fromDatepickerProps, inputProps: fromInputProps } = useDatepicker({
        defaultSelected: fromDate.toDate(),
        onDateChange: onFromDateChange
    });

    const { datepickerProps: toDatepickerProps, inputProps: toInputProps } = useDatepicker({
        defaultSelected: toDate.toDate(),
        onDateChange: onToDateChange
    });

    return (
        <>
            <VStack gap="2" className="">
                <HStack className="items-end" gap="1">
                    <TextField
                        label="Dato fra"
                        value={fromDateKeyboardInput}
                        onChange={(e) => {
                            setFromDateKeyboardInput(e.target.value);
                        }}
                        size="small"
                    />
                    <Button
                        variant="secondary"
                        title="Åpne datovelger modal for fra dato"
                        icon={<CalendarIcon aria-hidden />}
                        size="small"
                        onClick={() => setFromModalOpen(true)}
                    />
                    <Modal
                        aria-label="Datovelger for start av periode"
                        open={fromModalOpen}
                        onClose={() => setFromModalOpen(false)}
                    >
                        <DatePicker.Standalone
                            {...fromDatepickerProps}
                            dropdownCaption
                            fromDate={minFromDate}
                            toDate={maxFromDate}
                        />
                        <Modal.Footer className="p-0">
                            <Button type="button" variant="tertiary" onClick={() => setFromModalOpen(false)}>
                                Lukk
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </HStack>
                <HStack className="items-end" gap="1">
                    <TextField
                        label="Dato til"
                        value={toDateKeyboardInput}
                        size="small"
                        onChange={(e) => {
                            setToDateKeyboardInput(e.target.value);
                        }}
                    />
                    <Button
                        variant="secondary"
                        title="Åpne datovelger modal for til dato"
                        icon={<CalendarIcon aria-hidden />}
                        size="small"
                        onClick={() => setToModalOpen(true)}
                    />
                    <Modal
                        aria-label="Datovelger for slutten av periode"
                        open={toModalOpen}
                        onClose={() => setToModalOpen(false)}
                    >
                        <DatePicker.Standalone
                            dropdownCaption
                            fromDate={minToDate}
                            toDate={maxToDate}
                            {...toDatepickerProps}
                        />
                        <Modal.Footer className="p-0">
                            <Button type="button" variant="tertiary" onClick={() => setToModalOpen(false)}>
                                Lukk
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </HStack>
            </VStack>
            {periodeFeilmelding && <ErrorMessage>{periodeFeilmelding}</ErrorMessage>}
        </>
    );
}

export default PeriodDatePicker;
