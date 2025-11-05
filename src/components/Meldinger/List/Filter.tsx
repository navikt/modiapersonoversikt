import { XMarkIcon } from '@navikt/aksel-icons';
import {
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
import { atom, useAtom, useAtomValue } from 'jotai';
import { atomWithReset, useResetAtom } from 'jotai/utils';
import { debounce, isEqual, xor } from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import DateRangeSelector from 'src/components/DateFilters/DatePeriodSelector';
import type { DateRange } from 'src/components/DateFilters/types';
import { useMeldinger } from 'src/lib/clients/modiapersonoversikt-api';
import { TraadType } from 'src/lib/types/modiapersonoversikt-api';
import { Temagruppe, temagruppeTekst } from 'src/lib/types/temagruppe';
import { filterType, trackExpansionCardApnet, trackExpansionCardLukket, trackFilterEndret } from 'src/utils/analytics';
import { twMerge } from 'tailwind-merge';
import { traadTypeTekst } from './tekster';

export type MeldingerFilter = {
    tema?: Temagruppe[];
    search?: string;
    traadType?: TraadType[];
    dateRange: DateRange | null;
};
const defaultFilters: MeldingerFilter = {
    traadType: Object.values(TraadType),
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
    const { data: traader } = useMeldinger();
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
    (_get, set, newVal: TraadType) => {
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
                {Object.values(TraadType).map((t) => (
                    <Switch
                        key={t}
                        size="small"
                        checked={value?.includes(t)}
                        onChange={() => {
                            setValue(t);
                            trackFilterEndret('meldinger', filterType.TYPE);
                        }}
                    >
                        {traadTypeTekst(true, t)}
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

    const activeFilters = useMemo(() => {
        let count = 0;
        if (filters.search?.length) {
            count++;
        }
        if (filters.tema?.length) {
            count++;
        }
        if (filters.traadType && filters.traadType.length < 3) {
            count++;
        }
        if (filters.dateRange) {
            count++;
        }

        return count ? `(${count})` : null;
    }, [filters]);

    return <>Filter {activeFilters}</>;
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
    const [open, setOpen] = useState(false);
    const expansionFilterRef = useRef<HTMLDivElement>(null);

    const handleExpansionChange = () => {
        setTimeout(() => {
            if (!expansionFilterRef.current) return;
            const isOpen = expansionFilterRef.current.classList.contains('aksel-expansioncard--open');
            setOpen(isOpen);
            if (isOpen !== open) {
                isOpen ? trackExpansionCardLukket('meldingerfilter') : trackExpansionCardApnet('meldingerfilter');
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
                <ExpansionCard.Header className="p-1">
                    <Box.New paddingInline="4">
                        <ExpansionCard.Title size="small">
                            <FilterTitle />
                        </ExpansionCard.Title>
                    </Box.New>
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
