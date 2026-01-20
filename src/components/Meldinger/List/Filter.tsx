import { XMarkIcon } from '@navikt/aksel-icons';
import {
    BodyShort,
    Box,
    Button,
    ExpansionCard,
    Fieldset,
    HStack,
    Search,
    Switch,
    UNSAFE_Combobox,
    VStack
} from '@navikt/ds-react';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithReset, RESET, useResetAtom } from 'jotai/utils';
import { debounce, isEqual, xor } from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import DateRangeSelector from 'src/components/DateFilters/DatePeriodSelector';
import type { DateRange } from 'src/components/DateFilters/types';
import {useFilterMeldinger, useTraader} from 'src/components/Meldinger/List/utils';
import { usePersonAtomValue } from 'src/lib/state/context';
import { Temagruppe, temagruppeTekst } from 'src/lib/types/temagruppe';
import { filterType, trackExpansionCardApnet, trackExpansionCardLukket, trackFilterEndret } from 'src/utils/analytics';
import { twMerge } from 'tailwind-merge';

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
    const { traader } = useTraader();
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
            <HStack wrap gap="2">
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
    const filters = useAtomValue(meldingerFilterAtom);
    const { traader } = useTraader();
    const filteredMeldinger = useFilterMeldinger(traader, filters);
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
    const [open, setOpen] = useState(false);
    const fnr = usePersonAtomValue();
    const expansionFilterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setFilter(RESET);
    }, [fnr]);

    const handleExpansionChange = () => {
        setTimeout(() => {
            if (!expansionFilterRef.current) return;
            const isOpen = expansionFilterRef.current.classList.contains('aksel-expansioncard--open');
            setOpen(isOpen);
            if (isOpen !== open) {
                isOpen ? trackExpansionCardApnet('meldingerfilter') : trackExpansionCardLukket('meldingerfilter');
            }
        }, 0);
    };

    return (
        <Box.New marginInline="0 2" className={twMerge(open && 'max-h-full')}>
            <ExpansionCard
                onClick={handleExpansionChange}
                ref={expansionFilterRef}
                size="small"
                aria-label="Filtrer meldinger"
                className={twMerge(open && 'max-h-full overflow-auto')}
            >
                <ExpansionCard.Header className="py-0 pl-2">
                    <ExpansionCard.Title size="small" as="h3" className="text-ax-medium" role="alert">
                        <FilterTitle />
                    </ExpansionCard.Title>
                </ExpansionCard.Header>
                <ExpansionCard.Content className="overflow-visible">
                    <VStack gap="2">
                        <SearchField />
                        <Box.New maxWidth="17rem">
                            <TemaFilter />
                        </Box.New>
                        <Box.New maxWidth="17rem">
                            <TraadTypeFilter />
                        </Box.New>
                        <Box.New>
                            <DateFilter />
                        </Box.New>
                        <Box.New>
                            <ResetFilters />
                        </Box.New>
                    </VStack>
                </ExpansionCard.Content>
            </ExpansionCard>
        </Box.New>
    );
};
