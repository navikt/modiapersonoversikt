import { ArrowCirclepathReverseIcon } from '@navikt/aksel-icons';
import { Box, Button, HStack, UNSAFE_Combobox } from '@navikt/ds-react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { atom, useAtom, useSetAtom } from 'jotai';
import { atomWithReset, RESET } from 'jotai/utils';
import { xor } from 'lodash';
import { useCallback, useEffect, useRef } from 'react';
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
    periodeType: PeriodType;
};

const defaultDate = getPeriodFromOption(PeriodType.LAST_TWO_YEARS);

export const utbetalingFilterAtom = atomWithReset<UtbetalingFilter>({
    dateRange: defaultDate,
    periodeType: PeriodType.LAST_TWO_YEARS,
    ytelseTyper: []
});

const utbetalingFilterPeriodTypeAtom = atom(
    (get) => get(utbetalingFilterAtom).periodeType,
    (_get, set, newVal: PeriodType) => {
        set(utbetalingFilterAtom, (filters) => ({
            ...filters,
            periodeType: newVal
        }));
    }
);

const utbetalingFilterYtelseTypeAtom = atom(
    (get) => get(utbetalingFilterAtom).ytelseTyper,
    (_get, set, newVal: string) => {
        set(utbetalingFilterAtom, (filters) => ({
            ...filters,
            ytelseTyper: filters.ytelseTyper ? xor(filters.ytelseTyper, [newVal]) : [newVal]
        }));
    }
);

const utbetalingFilterDateRangeAtom = atom(
    (get) => get(utbetalingFilterAtom).dateRange,
    (_get, set, dateRange: DateRange | null) => {
        const range = dateRange ?? defaultDate;
        set(utbetalingFilterAtom, (filters) => ({
            ...filters,
            dateRange: range
        }));
    }
);

export const DateFilter = () => {
    const [value, setValue] = useAtom(utbetalingFilterDateRangeAtom);
    const [periodType, setPeriodType] = useAtom(utbetalingFilterPeriodTypeAtom);
    const { periode } = useSearch({ from: '/new/person/utbetaling' });
    const navigate = useNavigate({ from: '/new/person/utbetaling' });
    const lenketPeriode = periode === 'siste30' ? getPeriodFromOption(PeriodType.LAST_30_DAYS) : null;
    return (
        <DateRangePickerWithDebounce
            dateRange={lenketPeriode ?? value}
            onPeriodChange={(type) => {
                setPeriodType(type);
                if (lenketPeriode) void navigate({ search: {} });
            }}
            period={lenketPeriode ? PeriodType.LAST_30_DAYS : periodType}
            onRangeChange={(range) => {
                setValue(range ?? null);
                if (lenketPeriode) void navigate({ search: {} });
            }}
        />
    );
};

const UtbetalingYtelserFilter = () => {
    const { data } = useFilterUtbetalinger();
    const utbetalinger = data?.alleUtbetalinger;
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
    const { periode } = useSearch({ from: '/new/person/utbetaling' });
    const navigate = useNavigate({ from: '/new/person/utbetaling' });

    const datoErlik = filter.dateRange.from?.isSame(defaultDate.from) && filter.dateRange.to?.isSame(defaultDate.to);
    const isDirty = Boolean(periode) || filter.ytelseTyper.isNotEmpty() || !datoErlik;

    return (
        <Button
            icon={<ArrowCirclepathReverseIcon aria-hidden />}
            disabled={!isDirty}
            onClick={() => {
                setFilter(RESET);
                if (periode) void navigate({ search: {} });
            }}
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
    const forrigePerson = useRef<string | undefined>(undefined);
    const { periode } = useSearch({ from: '/new/person/utbetaling' });
    const navigate = useNavigate({ from: '/new/person/utbetaling' });

    useEffect(() => {
        if (forrigePerson.current !== fnr) {
            setFilter(RESET);
            if (forrigePerson.current !== undefined && periode) void navigate({ search: {} });
            forrigePerson.current = fnr;
        }
    }, [fnr, periode, navigate, setFilter]);

    return (
        <HStack gap="space-8" justify="start">
            <Box>
                <DateFilter />
            </Box>
            <Box flexGrow="1">
                <UtbetalingYtelserFilter />
            </Box>
            <HStack align="end">
                <ResetFilter />
            </HStack>
        </HStack>
    );
};
