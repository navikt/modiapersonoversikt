import { XMarkIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Button, Fieldset, HStack, Search, Switch, UNSAFE_Combobox, VStack } from '@navikt/ds-react';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithReset, RESET, useResetAtom } from 'jotai/utils';
import { debounce, isEqual, xor } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import DateRangeSelector from 'src/components/DateFilters/DatePeriodSelector';
import type { DateRange } from 'src/components/DateFilters/types';
import { FilterExpansionCard } from 'src/components/FilterExpansionCard';
import { useFilterMeldinger, useTraader } from 'src/components/Meldinger/List/utils';
import { usePersonAtomValue } from 'src/lib/state/context';
import { Temagruppe, temagruppeTekst } from 'src/lib/types/temagruppe';
import { filterType, trackFilterEndret } from 'src/utils/analytics';

const traadTyperFilter = ['Referat', 'Samtale', 'Infomelding', 'Chat'];

export type MeldingerFilter = {
    tema?: Temagruppe[];
    search?: string;
    traadType?: string[];
    dateRange: DateRange | null;
};

const defaultFilters: MeldingerFilter = {
    traadType: traadTyperFilter,
    dateRange: null
};

export const meldingerFilterAtom = atomWithReset<MeldingerFilter>(defaultFilters);
const meldingerFilterTemaAtom = atom(
    (get) => get(meldingerFilterAtom).tema,
    (_get, set, newVal: Temagruppe) => {
        set(meldingerFilterAtom, (filters) => ({
            ...filters,
            tema: filters.tema ? xor(filters.tema, [newVal]) : [newVal]
        }));
    }
);

const TemaFilter = () => {
    const { data: traader } = useTraader();
    const temaOptions = useMemo(() => {
        const allTema = Object.entries(Temagruppe).map(([, t]) => ({
            label: temagruppeTekst(t),
            value: t
        }));
        const meldingerTema = traader.map((t) => t.temagruppe);
        return allTema
            .filter((t) => meldingerTema.includes(t.value))
            .filter((t) => t.value !== Temagruppe.InnholdSlettet);
    }, [traader]);
    const [selectedTema, setSelectedTema] = useAtom(meldingerFilterTemaAtom);

    const selectedOptions = temaOptions.filter((o) => selectedTema?.includes(o.value));

    const onToggleSelected = useCallback(
        (option: string) => {
            setSelectedTema(option as Temagruppe);
            trackFilterEndret('meldinger', filterType.TEMA);
        },
        [setSelectedTema]
    );

    return (
        <UNSAFE_Combobox
            size="small"
            label="Tema"
            options={temaOptions}
            isMultiSelect
            selectedOptions={selectedOptions}
            onToggleSelected={onToggleSelected}
        />
    );
};

const meldingerFilterSearchAtom = atom(
    (get) => get(meldingerFilterAtom).search,
    (_get, set, newVal: string) => {
        set(meldingerFilterAtom, (filters) => ({
            ...filters,
            search: newVal.length ? newVal : undefined
        }));
    }
);
const SearchField = () => {
    const [internalValue, setInternalValue] = useState('');
    const [value, setValue] = useAtom(meldingerFilterSearchAtom);

    useEffect(() => {
        setInternalValue(value ?? '');
    }, [value]);

    const setValueOgTrackSok = (v: string) => {
        setValue(v);
        trackFilterEndret('meldinger', filterType.SOK);
    };

    const setAtomValue = debounce(setValueOgTrackSok, 500);
    return (
        <Search
            size="small"
            label="Søkeord"
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

const meldingerFilterTraadTypeAtom = atom(
    (get) => get(meldingerFilterAtom).traadType,
    (_get, set, newVal: string) => {
        set(meldingerFilterAtom, (filters) => ({
            ...filters,
            traadType: xor(filters.traadType, [newVal])
        }));
    }
);
const TraadTypeFilter = () => {
    const [value, setValue] = useAtom(meldingerFilterTraadTypeAtom);

    return (
        <Fieldset size="small" legend="Type dialog">
            <HStack wrap gap="space-8">
                {traadTyperFilter.map((t) => (
                    <Switch
                        key={t}
                        size="small"
                        checked={value?.includes(t)}
                        onChange={() => {
                            setValue(t);
                            trackFilterEndret('meldinger', filterType.TYPE);
                        }}
                    >
                        {t}
                    </Switch>
                ))}
            </HStack>
        </Fieldset>
    );
};

const meldingerFilterDateAtom = atom(
    (get) => get(meldingerFilterAtom).dateRange,
    (_get, set, dateRange: DateRange | null) => {
        set(meldingerFilterAtom, (filters) => ({
            ...filters,
            dateRange
        }));
    }
);
const DateFilter = () => {
    const [value, setValue] = useAtom(meldingerFilterDateAtom);
    return <DateRangeSelector resettable={false} range={value} onChange={setValue} defaultPeriodType={null} />;
};

const FilterTitle = () => {
    const filteredMeldinger = useFilterMeldinger();
    return (
        <>
            Filter ({filteredMeldinger.length} {filteredMeldinger.length === 1 ? 'dialog' : 'dialoger'})
            <BodyShort visuallyHidden>funnet</BodyShort>
        </>
    );
};

const ResetFilters = () => {
    const resetFilter = useResetAtom(meldingerFilterAtom);
    const filters = useAtomValue(meldingerFilterAtom);
    const canReset = useMemo(() => !isEqual(filters, defaultFilters), [filters]);

    if (!canReset) return;

    return (
        <Button variant="tertiary" size="small" icon={<XMarkIcon />} onClick={resetFilter}>
            Resett filter
        </Button>
    );
};

export const TraadListFilterCard = () => {
    const setFilter = useSetAtom(meldingerFilterAtom);
    const fnr = usePersonAtomValue();

    useEffect(() => {
        setFilter(RESET);
    }, [fnr]);

    return (
        <FilterExpansionCard fane="meldinger" title={<FilterTitle />}>
            <VStack gap="space-8">
                <SearchField />
                <Box maxWidth="17rem">
                    <TemaFilter />
                </Box>
                <Box maxWidth="17rem">
                    <TraadTypeFilter />
                </Box>
                <Box>
                    <DateFilter />
                </Box>
                <Box>
                    <ResetFilters />
                </Box>
            </VStack>
        </FilterExpansionCard>
    );
};
