import { HStack, InlineMessage, Select, VStack } from '@navikt/ds-react';
import dayjs from 'dayjs';
import { debounce } from 'lodash';
import { useState } from 'react';
import { getOptionFromPeriod, getPeriodFromOption } from 'src/components/DateFilters/DatePeriodSelector';
import { SingleDatePicker } from 'src/components/DateFilters/SingleDatePicker';
import { type DateRange, PeriodType } from 'src/components/DateFilters/types';

export const DateRangePickerWithDebounce = ({
    dateRange,
    onRangeChange,
    showPeriodSelector = true
}: {
    dateRange: DateRange;
    onRangeChange: (val?: DateRange) => void;
    onPeriodChange?: (val?: PeriodType) => void;
    showPeriodSelector?: boolean;
}) => {
    const [error, setError] = useState<string | undefined>();
    const [selectedPeriode, setSelectedPeriode] = useState<PeriodType | ''>(PeriodType.LAST_30_DAYS);

    const [selectedDateRange, setSelectedDateRange] = useState<DateRange>(
        selectedPeriode ? getPeriodFromOption(selectedPeriode) : dateRange
    );

    const debounceSetDate = debounce((newRange: DateRange) => {
        onRangeChange(newRange);
        setError(undefined);
        const period = getOptionFromPeriod(newRange);
        setSelectedPeriode(period === PeriodType.CUSTOM ? '' : period);
    }, 500);

    const debouncedValidate = debounce((validation) => {
        if (!validation.isValidDate) setError('Feil datoformat: dd.mm.yyyy');
        if (validation.isBefore || validation.isBefore) setError('Fra dato kan ikke være senere enn til dato');
    }, 500);

    return (
        <VStack>
            <HStack gap="2" wrap={false}>
                {showPeriodSelector && (
                    <Select
                        label="Periode"
                        size="small"
                        value={selectedPeriode ?? ''}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value === '') {
                                setSelectedPeriode('');
                            } else {
                                const period = value as PeriodType;
                                setSelectedPeriode(period);
                                setSelectedDateRange(getPeriodFromOption(period));
                            }
                        }}
                    >
                        <option value="">- Velg periode -</option>
                        <option key={PeriodType.LAST_30_DAYS} value={PeriodType.LAST_30_DAYS}>
                            Siste 30 dager
                        </option>
                        <option key={PeriodType.THIS_YEAR} value={PeriodType.THIS_YEAR}>
                            Inneværende år
                        </option>
                        <option key={PeriodType.LAST_YEAR} value={PeriodType.LAST_YEAR}>
                            I fjor
                        </option>
                    </Select>
                )}

                <SingleDatePicker
                    date={selectedDateRange.from.toDate()}
                    label="Fra"
                    onDateChange={(date) => debounceSetDate({ from: dayjs(date), to: selectedDateRange.to })}
                    onValidate={debouncedValidate}
                    maxDate={selectedDateRange.to.toDate()}
                />
                <SingleDatePicker
                    date={selectedDateRange.to.toDate()}
                    label="Til"
                    onDateChange={(date) => debounceSetDate({ from: selectedDateRange.from, to: dayjs(date) })}
                    onValidate={debouncedValidate}
                    minDate={selectedDateRange.from.toDate()}
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
