import { ArrowCirclepathReverseIcon } from '@navikt/aksel-icons';
import { Box, Button, HStack, UNSAFE_Combobox } from '@navikt/ds-react';
import { atom, useAtom, useSetAtom } from 'jotai';
import { atomWithReset, RESET } from 'jotai/utils';
import { xor } from 'lodash';
import { useCallback, useEffect } from 'react';
import { getPeriodFromOption } from 'src/components/DateFilters/DatePeriodSelector';
import { DateRangePickerWithDebounce } from 'src/components/DateFilters/DateRangePickerWithDebounce';
import { type DateRange, PeriodType } from 'src/components/DateFilters/types';
import { reduceUtbetlingerTilYtelser, useFilterUtbetalinger } from 'src/components/Utbetaling/utils';
import type { Utbetaling, Ytelse } from 'src/generated/modiapersonoversikt-api';
import { usePersonAtomValue } from 'src/lib/state/context';
import { filterType, trackFilterEndret } from 'src/utils/analytics';
import { sorterAlfabetisk } from 'src/utils/string-utils';

export type UtbetalingFilter = {
    dateRange: DateRange;
    ytelseTyper: string[];
};

const defaultDate = getPeriodFromOption(PeriodType.CUSTOM);

export const utbetalingFilterAtom = atomWithReset<UtbetalingFilter>({
    dateRange: defaultDate,
    ytelseTyper: []
});

const utbetalingFilterYtelseTypeAtom = atom(
    (get) => get(utbetalingFilterAtom).ytelseTyper,
    (_get, set, newVal: string) => {
        set(utbetalingFilterAtom, (filters) => ({
            ...filters,
            ytelseTyper: filters.ytelseTyper ? xor(filters.ytelseTyper, [newVal]) : [newVal]
        }));
    }
);

export const utbetalingFilterDateRangeAtom = atom(
    (get) => get(utbetalingFilterAtom).dateRange,
    (_get, set, dateRange: DateRange | null) => {
        const range = dateRange ?? defaultDate;
        set(utbetalingFilterAtom, (filters) => ({
            ...filters,
            dateRange: range
        }));
    }
);

const DateFilter = () => {
    const [value, setValue] = useAtom(utbetalingFilterDateRangeAtom);
    return <DateRangePickerWithDebounce dateRange={value} onRangeChange={(range) => setValue(range ?? null)} />;
};

const UtbetalingYtelserFilter = () => {
    const { data } = useFilterUtbetalinger();
    const utbetalinger = data?.utbetalinger ?? [];
    const [selectedYtelse, setSelectedYtelse] = useAtom(utbetalingFilterYtelseTypeAtom);

    const onToggleSelected = useCallback(
        (option: string) => {
            setSelectedYtelse(option);
            trackFilterEndret('utbetaling', filterType.YTELSE_TYPE);
        },
        [setSelectedYtelse]
    );

    const getUnikeYtelser = (data: Utbetaling[]): string[] => {
        const getTypeFromYtelse = (ytelse: Ytelse) => ytelse.type || 'Mangler beskrivelse';
        const fjernDuplikater = (ytelse: string, index: number, self: Array<string>) => self.indexOf(ytelse) === index;
        return reduceUtbetlingerTilYtelser(data).map(getTypeFromYtelse).filter(fjernDuplikater).sort(sorterAlfabetisk);
    };

    const unikeYtelser = getUnikeYtelser(utbetalinger);

    return (
        <UNSAFE_Combobox
            size="small"
            label="Ytelse"
            options={unikeYtelser}
            isMultiSelect
            selectedOptions={selectedYtelse}
            onToggleSelected={onToggleSelected}
        />
    );
};

const ResetFilter = () => {
    const [filter, setFilter] = useAtom(utbetalingFilterAtom);

    const datoErlik = filter.dateRange.from.isSame(defaultDate.from) && filter.dateRange.to.isSame(defaultDate.to);
    const isDirty = filter.ytelseTyper.isNotEmpty() || !datoErlik;

    return (
        <Button
            icon={<ArrowCirclepathReverseIcon />}
            disabled={!isDirty}
            onClick={() => setFilter(RESET)}
            variant="tertiary"
            size="small"
        >
            Tilbakestill
        </Button>
    );
};

export const UtbetalingListFilter = () => {
    const setFilter = useSetAtom(utbetalingFilterAtom);
    const fnr = usePersonAtomValue();

    useEffect(() => {
        setFilter(RESET);
    }, [fnr]);

    return (
        <HStack gap="2" justify="start">
            <Box.New>
                <DateFilter />
            </Box.New>
            <Box.New flexGrow="1">
                <UtbetalingYtelserFilter />
            </Box.New>
            <HStack align="end">
                <ResetFilter />
            </HStack>
        </HStack>
    );
};
