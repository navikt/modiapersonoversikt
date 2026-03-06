import { HStack, InlineMessage, VStack } from '@navikt/ds-react';
import dayjs from 'dayjs';
import { debounce } from 'lodash';
import { useState } from 'react';
import { getOptionFromPeriod, getPeriodFromOption } from 'src/components/DateFilters/DatePeriodSelector';
import { SelectPeriod } from 'src/components/DateFilters/SelectPeriod';
import { SingleDatePicker } from 'src/components/DateFilters/SingleDatePicker';
import { type DateRange, PeriodType } from 'src/components/DateFilters/types';

export const DateRangePickerWithDebounce = ({
    dateRange,
    onRangeChange,
    onPeriodChange,
    period = PeriodType.CUSTOM
}: {
    dateRange: DateRange;
    onRangeChange: (val?: DateRange) => void;
    onPeriodChange: (val: PeriodType) => void;
    period: PeriodType;
}) => {
    const [error, setError] = useState<string | undefined>();

    const debounceSetDate = debounce((newRange: DateRange) => {
        onRangeChange(newRange);
        setError(undefined);
        const period = getOptionFromPeriod(newRange);
        onPeriodChange(period);
    }, 500);

    const debouncedValidate = debounce((validation) => {
        if (!validation.isValidDate) setError('Feil datoformat: dd.mm.yyyy');
        if (validation.isBefore || validation.isBefore) setError('Fra dato kan ikke være senere enn til dato');
    }, 500);

    const periodChange = (value: string) => {
        if (value === '') {
            onPeriodChange(PeriodType.CUSTOM);
        } else {
            const period = value as PeriodType;
            onPeriodChange(period);
            onRangeChange(getPeriodFromOption(period));
        }
    };

    return (
        <VStack>
            <HStack gap="2" wrap={false}>
                <SelectPeriod onPeriodChange={periodChange} selectedPeriod={period} />
                <SingleDatePicker
                    date={dateRange.from.toDate()}
                    label="Fra"
                    onDateChange={(date) => debounceSetDate({ from: dayjs(date), to: dateRange.to })}
                    onValidate={debouncedValidate}
                    maxDate={dateRange.to.toDate()}
                />
                <SingleDatePicker
                    date={dateRange.to.toDate()}
                    label="Til"
                    onDateChange={(date) => debounceSetDate({ from: dateRange.from, to: dayjs(date) })}
                    onValidate={debouncedValidate}
                    minDate={dateRange.from.toDate()}
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
