import { ArrowCirclepathReverseIcon } from '@navikt/aksel-icons';
import { Box, Button, HStack, Search, UNSAFE_Combobox } from '@navikt/ds-react';
import { getRouteApi } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithReset, RESET, useHydrateAtoms } from 'jotai/utils';
import { debounce, xor } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getOptionFromPeriod } from 'src/components/DateFilters/DatePeriodSelector';
import { DateRangePickerWithDebounce } from 'src/components/DateFilters/DateRangePickerWithDebounce';
import { type DateRange, PeriodType } from 'src/components/DateFilters/types';
import { useTemaerForPeriode } from 'src/components/Dokumenter/utils';
import { aktivBrukerLastetAtom, usePersonAtomValue } from 'src/lib/state/context';
import { filterType, trackFilterEndret } from 'src/utils/analytics';

const routeApi = getRouteApi('/new/person/dokumenter');

export type DokumenterFilter = {
    dateRange: DateRange | null;
    periodType: PeriodType;
    temaer: string[];
    saksId?: string;
};

export const dokumenterFilterAtom = atomWithReset<DokumenterFilter>({
    dateRange: null,
    temaer: [],
    saksId: '',
    periodType: PeriodType.UNSET
});

const dokFilterTemaAtom = atom(
    (get) => get(dokumenterFilterAtom).temaer,
    (_get, set, newVal: string) => {
        set(dokumenterFilterAtom, (filters) => ({
            ...filters,
            temaer: filters.temaer ? xor(filters.temaer, [newVal]) : [newVal]
        }));
    }
);

const dokFilterSaksIdAtom = atom(
    (get) => get(dokumenterFilterAtom).saksId,
    (_get, set, newVal: string) => {
        set(dokumenterFilterAtom, (filters) => ({
            ...filters,
            saksId: newVal.length ? newVal : undefined
        }));
    }
);

const dokFilterDateRangeAtom = atom(
    (get) => get(dokumenterFilterAtom).dateRange,
    (_get, set, dateRange: DateRange | null) => {
        set(dokumenterFilterAtom, (filters) => ({
            ...filters,
            dateRange
        }));
    }
);

const dokFilterPeriodType = atom(
    (get) => get(dokumenterFilterAtom).periodType,
    (_get, set, type: PeriodType) => {
        set(dokumenterFilterAtom, (filters) => ({
            ...filters,
            periodType: type
        }));
    }
);

const SaksIdSearchField = () => {
    const [internalValue, setInternalValue] = useState('');
    const [value, setValue] = useAtom(dokFilterSaksIdAtom);
    const navigate = routeApi.useNavigate();

    useEffect(() => {
        setInternalValue(value ?? '');
    }, [value]);

    const setValueOgTrackSok = (v: string) => {
        setValue(v);
        navigate({ search: { saksid: v } });
        trackFilterEndret('dokumenter', filterType.SOK);
    };

    const setAtomValue = debounce(setValueOgTrackSok, 500);
    return (
        <Search
            size="small"
            label="Saksnummer"
            variant="secondary"
            hideLabel={false}
            value={internalValue}
            onChange={(v) => {
                setInternalValue(v);
                setAtomValue(v);
            }}
        />
    );
};

const DateFilter = () => {
    const [value, setValue] = useAtom(dokFilterDateRangeAtom);
    const [periodType, setPeriodType] = useAtom(dokFilterPeriodType);
    const navigate = routeApi.useNavigate();

    const onChange = (range?: DateRange) => {
        setValue(range ?? null);
        navigate({
            search: {
                fra: range?.from ? range?.from.format('DD.MM.YYYY').toString() : '',
                til: range?.to ? range?.to.format('DD.MM.YYYY').toString() : ''
            }
        });
    };
    return (
        <DateRangePickerWithDebounce
            period={periodType}
            onPeriodChange={setPeriodType}
            dateRange={value}
            onRangeChange={onChange}
            allowUnset
        />
    );
};

const TemaFilter = () => {
    const navigate = routeApi.useNavigate();
    const alleTemaer = useTemaerForPeriode();
    const [selectedTemaer, setSelectedTemaer] = useAtom(dokFilterTemaAtom);

    useEffect(() => {
        const gyldigeTemaKoder = new Set(alleTemaer.map((t) => t.temakode));
        const ugyldigeValg = selectedTemaer.filter((t) => !gyldigeTemaKoder.has(t));
        if (ugyldigeValg.length > 0) {
            const gyldigeValg = selectedTemaer.filter((t) => gyldigeTemaKoder.has(t));
            ugyldigeValg.forEach((tema) => {
                setSelectedTemaer(tema);
            });
            navigate({ search: { tema: gyldigeValg } });
        }
    }, [alleTemaer]);

    const onToggleSelected = useCallback(
        (option: string) => {
            setSelectedTemaer(option);
            trackFilterEndret('dokumenter', filterType.TEMA);
            navigate({ search: { tema: selectedTemaer ? xor(selectedTemaer, [option]) : [option] } });
        },
        [selectedTemaer]
    );

    return (
        <UNSAFE_Combobox
            size="small"
            label="Tema"
            options={alleTemaer.map((o) => ({
                label: `${o.temanavn} [${o.temakode}]`,
                value: o.temakode
            }))}
            isMultiSelect
            selectedOptions={selectedTemaer}
            onToggleSelected={onToggleSelected}
        />
    );
};

const ResetFilter = () => {
    const [filter, setFilter] = useAtom(dokumenterFilterAtom);
    const navigate = routeApi.useNavigate();

    const datoErlik = filter.dateRange === null;
    const isDirty = !filter.temaer.isEmpty() || filter.saksId !== '' || !datoErlik;

    const resetFilter = () => {
        setFilter(RESET);
        navigate({ search: { tema: [], saksid: '', fra: '', til: '' }, replace: true });
    };

    return (
        <Button
            icon={<ArrowCirclepathReverseIcon aria-hidden />}
            disabled={!isDirty}
            onClick={() => resetFilter()}
            variant="tertiary"
            size="small"
        >
            Tilbakestill
        </Button>
    );
};

export const DokumenterFilter = () => {
    const setFilter = useSetAtom(dokumenterFilterAtom);
    const queries = routeApi.useSearch();
    const fnr = usePersonAtomValue();
    const aktivBrukerLastet = useAtomValue(aktivBrukerLastetAtom);
    const prevFnrRef = useRef<string | undefined>(undefined);
    const dateRange: DateRange | null =
        queries.fra && queries.til
            ? {
                  from: dayjs(queries.fra, 'DD.MM.YYYY'),
                  to: dayjs(queries.til, 'DD.MM.YYYY')
              }
            : null;

    useHydrateAtoms([
        [
            dokumenterFilterAtom,
            {
                dateRange: dateRange,
                temaer: queries.tema ?? [],
                saksId: queries.saksid ?? '',
                periodType: dateRange ? getOptionFromPeriod(dateRange) : PeriodType.UNSET
            }
        ]
    ]);

    useEffect(() => {
        if (!aktivBrukerLastet) return;
        const prev = prevFnrRef.current;
        if (prev !== fnr) {
            prevFnrRef.current = fnr;
            if (prev !== undefined) {
                setFilter(RESET);
            }
        }
    }, [fnr, aktivBrukerLastet, setFilter]);

    return (
        <HStack gap="space-8" justify="start">
            <Box>
                <DateFilter />
            </Box>
            <Box flexGrow="1">
                <TemaFilter />
            </Box>
            <Box>
                <SaksIdSearchField />
            </Box>
            <HStack align="end">
                <ResetFilter />
            </HStack>
        </HStack>
    );
};
