import { XMarkIcon } from '@navikt/aksel-icons';
import { Box, Button, Radio, RadioGroup, VStack } from '@navikt/ds-react';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { useOpenTab } from 'src/app/personside/infotabs/utils/useOpenTab';
import CustomDatePickerModal from 'src/components/DateFilters/CustomDatePickerModal';
import { filterType, trackFilterEndret } from 'src/utils/analytics';
import { type DateRange, PeriodType } from './types';

export const getPeriodFromOption = (periodeValg: PeriodType): DateRange => {
    switch (periodeValg) {
        case PeriodType.LAST_30_DAYS:
            return {
                from: dayjs().subtract(30, 'day').startOf('day'),
                to: dayjs().startOf('day')
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
                to: dayjs().startOf('day')
            };
    }
};

const getOptionFromPeriod = (range: DateRange): PeriodType => {
    const { from, to } = range;
    const now = dayjs();

    const isSameDay = (d1: dayjs.Dayjs, d2: dayjs.Dayjs) => d1.isSame(d2, 'day');

    switch (true) {
        case isSameDay(from, now.subtract(30, 'day')) && isSameDay(to, now):
            return PeriodType.LAST_30_DAYS;
        case isSameDay(from, now.startOf('year')) && isSameDay(to, now.endOf('year')):
            return PeriodType.THIS_YEAR;
        case isSameDay(from, now.subtract(1, 'year').startOf('year')) &&
            isSameDay(to, now.subtract(1, 'year').endOf('year')):
            return PeriodType.LAST_YEAR;
        case isSameDay(from, now.subtract(2, 'year')) && isSameDay(to, now):
            return PeriodType.CUSTOM;
        default:
            return PeriodType.CUSTOM;
    }
};

type Props = {
    range: DateRange | null;
    onChange: (period: DateRange | null) => void;
    required?: boolean;
    defaultPeriodType?: PeriodType | null;
    resettable?: boolean;
};

const erPerioderLike = (a: DateRange | null, b: DateRange | null) => {
    if (!a || !b) return a === b;
    return dayjs(a.from).isSame(b.from, 'day') && dayjs(a.to).isSame(b.to, 'day');
};

function DateRangeSelector({
    range: period,
    onChange,
    resettable,
    required,
    defaultPeriodType = PeriodType.LAST_30_DAYS
}: Props) {
    const [periodType, setPeriodType] = useState<PeriodType | null>(defaultPeriodType);
    const fane = useOpenTab().path;

    useEffect(() => {
        if (period === null) {
            setPeriodType(defaultPeriodType);
        } else {
            setPeriodType(getOptionFromPeriod(period));
        }
    }, [period]);

    const onFraTilDatoChange = (val: DateRange) => {
        onChange(val);
        if (!erPerioderLike(period, val)) {
            trackFilterEndret(fane, filterType.DATO_EGENDEFINERT);
        }
    };
    const onPeriodTypeChange = useCallback(
        (type: PeriodType) => {
            setPeriodType(type);
            onChange(getPeriodFromOption(type));
            trackFilterEndret(fane, filterType.DATO_RADIO);
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
            {periodType === PeriodType.CUSTOM && period && (
                <CustomDatePickerModal period={period} onUpdate={onFraTilDatoChange} />
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
