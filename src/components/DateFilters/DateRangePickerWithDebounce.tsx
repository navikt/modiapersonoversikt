import { HStack, InlineMessage, VStack } from '@navikt/ds-react';
import dayjs from 'dayjs';
import { debounce } from 'lodash';
import { useState } from 'react';
import { SingleDatePicker } from 'src/components/DateFilters/SingleDatePicker';
import type { DateRange } from 'src/components/DateFilters/types';

export const DateRangePickerWithDebounce = ({
    dateRange,
    onRangeChange
}: {
    dateRange: DateRange;
    onRangeChange: (val?: DateRange) => void;
}) => {
    const [error, setError] = useState<string | undefined>();

    const debounceSetDate = debounce((newRange: DateRange) => {
        onRangeChange(newRange);
        setError(undefined);
    }, 500);

    const debouncedValidate = debounce((validation) => {
        if (!validation.isValidDate) setError('Feil datoformat: dd.mm.yyyy');
        if (validation.isBefore || validation.isBefore) setError('Fra dato kan ikke være senere enn til dato');
    }, 500);

    return (
        <VStack>
            <HStack gap="2" wrap={false}>
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
            <VStack height="30px" justify="center">
                {error && (
                    <InlineMessage size="small" status="error" className="pt-2">
                        {error}
                    </InlineMessage>
                )}
            </VStack>
        </VStack>
    );
};
