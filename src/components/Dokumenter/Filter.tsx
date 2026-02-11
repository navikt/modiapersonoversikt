import { Box, HStack, Search, Switch, UNSAFE_Combobox } from '@navikt/ds-react';
import { getRouteApi, useSearch } from '@tanstack/react-router';
import { atom, useAtom, useSetAtom } from 'jotai';
import { atomWithReset, RESET } from 'jotai/utils';
import { debounce, xor } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { getPeriodFromOption } from 'src/components/DateFilters/DatePeriodSelector';
import { DateRangePickerWithDebounce } from 'src/components/DateFilters/DateRangePickerWithDebounce';
import { type DateRange, PeriodType } from 'src/components/DateFilters/types';
import { useTemaer } from 'src/components/saker/utils';
import { usePersonAtomValue } from 'src/lib/state/context';
import { filterType, trackFilterEndret } from 'src/utils/analytics';

const routeApi = getRouteApi('/new/person/dokumenter');

export type DokumenterFilter = {
    dateRange: DateRange;
    temaer: string[];
    visAlle: boolean;
    saksId?: string;
};

const defaultDate = getPeriodFromOption(PeriodType.CUSTOM);

export const dokumenterFilterAtom = atomWithReset<DokumenterFilter>({
    dateRange: defaultDate,
    temaer: [],
    visAlle: true,
    saksId: ''
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
        const range = dateRange ?? defaultDate;
        set(dokumenterFilterAtom, (filters) => ({
            ...filters,
            dateRange: range
        }));
    }
);

const dokFilterVisAlleAtom = atom(
    (get) => get(dokumenterFilterAtom).visAlle,
    (_get, set, visAlle: boolean) => {
        set(dokumenterFilterAtom, (filters) => ({
            ...filters,
            visAlle: visAlle
        }));
    }
);

const SaksIdSearchField = () => {
    const [internalValue, setInternalValue] = useState('');
    const [value, setValue] = useAtom(dokFilterSaksIdAtom);

    useEffect(() => {
        setInternalValue(value ?? '');
    }, [value]);

    const setValueOgTrackSok = (v: string) => {
        setValue(v);
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
    return <DateRangePickerWithDebounce dateRange={value} onRangeChange={(range) => setValue(range ?? null)} />;
};

const TemaFilter = () => {
    const navigate = routeApi.useNavigate();
    const alleTemaer = useTemaer();
    const query = useSearch({ strict: false });

    const [selectedTemaer, setSelectedTemaer] = useAtom(dokFilterTemaAtom);

    const onToggleSelected = useCallback(
        (option: string) => {
            setSelectedTemaer(option);
            trackFilterEndret('dokumenter', filterType.TEMA);
            navigate({ search: { ...query, tema: selectedTemaer } });
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
    const [isChecked, setChecked] = useAtom(dokFilterVisAlleAtom);

    const datoErlik = filter.dateRange.from.isSame(defaultDate.from) && filter.dateRange.to.isSame(defaultDate.to);
    const isDirty = !filter.temaer.isEmpty() || filter.saksId !== '' || !datoErlik;

    useEffect(() => {
        if (isDirty && isChecked) {
            setChecked(false);
        }
    }, [isDirty, isChecked, setChecked, filter]);

    const setCheckedOgResetFilter = (checked: boolean) => {
        setChecked(checked);
        if (checked) {
            setFilter(RESET);
        }
    };

    return (
        <Switch
            className="mt-7"
            size="small"
            checked={isChecked}
            onChange={(e) => {
                setCheckedOgResetFilter(e.target.checked);
            }}
        >
            Vis alle
        </Switch>
    );
};

export const DokumenterFilter = () => {
    const setFilter = useSetAtom(dokumenterFilterAtom);
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
                <TemaFilter />
            </Box.New>
            <Box.New>
                <SaksIdSearchField />
            </Box.New>
            <HStack align="start">
                <ResetFilter />
            </HStack>
        </HStack>
    );
};
