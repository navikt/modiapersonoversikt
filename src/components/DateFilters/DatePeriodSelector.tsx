import { XMarkIcon } from '@navikt/aksel-icons';
import { Box, Button, Radio, RadioGroup, VStack } from '@navikt/ds-react';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import PeriodDatePicker from './PeriodDatePicker';
import { type DateRange, PeriodType } from './types';

export const getPeriodFromOption = (periodeValg: PeriodType): DateRange => {
    switch (periodeValg) {
        case PeriodType.LAST_30_DAYS:
            return {
                from: dayjs().subtract(30, 'day').startOf('day'),
                to: dayjs().endOf('day')
            };
        case PeriodType.THIS_YEAR:
            return {
                from: dayjs().startOf('year'),
                to: dayjs().endOf('year')
            };
        case PeriodType.LAST_YEAR:
            return {
                from: dayjs().subtract(1, 'year').startOf('year'),
                to: dayjs().subtract(1, 'year').endOf('year')
            };
        case PeriodType.CUSTOM:
            return {
                from: dayjs().subtract(2, 'year').startOf('day'),
                to: dayjs().endOf('day')
            };
    }
};

type Props = {
    range: DateRange | null;
    onChange: (period: DateRange | null) => void;
    required?: boolean;
    defaultPeriodType?: PeriodType | null;
    resettable?: boolean;
};

function DateRangeSelector({
    range: period,
    onChange,
    resettable,
    required,
    defaultPeriodType = PeriodType.LAST_30_DAYS
}: Props) {
    const [periodType, setPeriodType] = useState<PeriodType | null>(defaultPeriodType);

    useEffect(() => {
        if (period === null) {
            setPeriodType(defaultPeriodType);
        }
    });

    const onFraTilDatoChange = (val: DateRange) => {
        onChange(val);
    };
    const onPeriodTypeChange = useCallback(
        (type: PeriodType) => {
            setPeriodType(type);
            onChange(getPeriodFromOption(type));
        },
        [onChange]
    );

    const resetFilter = useCallback(() => {
        setPeriodType(defaultPeriodType);
        onChange(null);
    }, [onChange, defaultPeriodType]);

    return (
        <VStack gap="2">
            <RadioGroup legend="Periode" size="small" value={periodType ?? ''} onChange={onPeriodTypeChange}>
                {Object.entries(PeriodType).map(([, type]) => (
                    <Radio size="small" key={type} value={type}>
                        {type}
                    </Radio>
                ))}
            </RadioGroup>
            {periodType === PeriodType.CUSTOM && (
                <PeriodDatePicker period={period ?? undefined} onUpdate={onFraTilDatoChange} />
            )}
            {periodType && !required && resettable && (
                <Box.New>
                    <Button variant="tertiary" size="small" icon={<XMarkIcon />} onClick={resetFilter}>
                        Resett datofilter
                    </Button>
                </Box.New>
            )}
        </VStack>
    );
}

export default DateRangeSelector;
