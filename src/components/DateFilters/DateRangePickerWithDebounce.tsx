import { Box, HStack, InlineMessage, VStack } from '@navikt/ds-react';
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
    }, 500);

    return (
        <VStack>
            <HStack gap="2" wrap={false}>
                <SingleDatePicker
                    key={dateRange.from.valueOf()}
                    date={dateRange.from.toDate()}
                    label="Fra"
                    onDateChange={(date) => debounceSetDate({ from: dayjs(date), to: dateRange.to })}
                    onValidate={debouncedValidate}
                />
                <SingleDatePicker
                    key={dateRange.to.valueOf()}
                    date={dateRange.to.toDate()}
                    label="Til"
                    onDateChange={(date) => debounceSetDate({ from: dateRange.from, to: dayjs(date) })}
                    onValidate={debouncedValidate}
                />
            </HStack>
            <Box.New>
                {error ? (
                    <InlineMessage size="small" status="error">
                        {error}
                    </InlineMessage>
                ) : (
                    <Box.New height="10"></Box.New>
                )}
            </Box.New>
        </VStack>
    );
};
