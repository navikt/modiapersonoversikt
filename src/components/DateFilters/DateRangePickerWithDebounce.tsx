import { HStack, InlineMessage, VStack } from '@navikt/ds-react';
import dayjs from 'dayjs';
import { debounce } from 'lodash';
import { useRef, useState } from 'react';
import { getOptionFromPeriod, getPeriodFromOption } from 'src/components/DateFilters/DatePeriodSelector';
import { SelectPeriod } from 'src/components/DateFilters/SelectPeriod';
import { SingleDatePicker } from 'src/components/DateFilters/SingleDatePicker';
import { type DateRange, PeriodType } from 'src/components/DateFilters/types';

export const DateRangePickerWithDebounce = ({
    dateRange,
    onRangeChange,
    onPeriodChange,
    period = PeriodType.CUSTOM,
    allowUnset
}: {
    dateRange: DateRange | null;
    onRangeChange: (val?: DateRange) => void;
    onPeriodChange: (val: PeriodType) => void;
    period: PeriodType;
    allowUnset?: boolean;
}) => {
    const [error, setError] = useState<string | undefined>();
    const fromIsEmpty = useRef(false);
    const toIsEmpty = useRef(false);

    const debounceSetDate = debounce((newRange: DateRange) => {
        if (!newRange.from && !newRange.to) {
            onRangeChange(undefined);
            onPeriodChange(PeriodType.UNSET);
            setError(undefined);
        } else {
            onRangeChange(newRange);
            setError(undefined);
            onPeriodChange(getOptionFromPeriod(newRange));
        }
    }, 500);

    const debouncedValidate = debounce((validation) => {
        if (validation.isEmpty && allowUnset) return;
        if (!validation.isValidDate) setError('Feil datoformat: dd.mm.yyyy');
        if (validation.isBefore) setError('Fra dato kan ikke være senere enn til dato');
    }, 500);

    const periodChange = (value: string) => {
        if (value === '') {
            onPeriodChange(PeriodType.UNSET);
            onRangeChange(undefined);
        } else {
            const period = value as PeriodType;
            onPeriodChange(period);
            onRangeChange(getPeriodFromOption(period) ?? undefined);
        }
    };

    return (
        <VStack>
            <HStack gap="space-8" wrap={false}>
                <SelectPeriod onPeriodChange={periodChange} selectedPeriod={period} />
                <SingleDatePicker
                    date={dateRange?.from}
                    label="Fra"
                    // onDateChange kjører før onValidate, så isEmpty-flagget vil alltid vært utdatert der.
                    // Vi fanger opp native onChange-eventet først for å sette riktig verdi på isEmpty-refen før onDateChange fyrer.
                    onInputChange={(value) => {
                        fromIsEmpty.current = !value;
                    }}
                    onDateChange={(date) => {
                        if (date === undefined && !fromIsEmpty.current) return;
                        debounceSetDate({ from: date ? dayjs(date) : undefined, to: dateRange?.to });
                    }}
                    onValidate={debouncedValidate}
                    maxDate={dateRange?.to?.toDate()}
                />
                <SingleDatePicker
                    date={dateRange?.to}
                    label="Til"
                    onInputChange={(value) => {
                        toIsEmpty.current = !value;
                    }}
                    onDateChange={(date) => {
                        if (date === undefined && !toIsEmpty.current) return;
                        debounceSetDate({ from: dateRange?.from, to: date ? dayjs(date) : undefined });
                    }}
                    onValidate={debouncedValidate}
                    minDate={dateRange?.from?.toDate()}
                />
            </HStack>
            {error && (
                <InlineMessage size="small" status="error" aria-live="polite" className="mt-1">
                    {error}
                </InlineMessage>
            )}
        </VStack>
    );
};
