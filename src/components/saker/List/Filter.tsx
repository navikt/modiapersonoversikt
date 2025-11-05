import { Box, ExpansionCard, Fieldset, Search, Skeleton, Switch, UNSAFE_Combobox, VStack } from '@navikt/ds-react';
import { atom, useAtom, useAtomValue } from 'jotai';
import { atomWithReset } from 'jotai/utils';
import { debounce, xor } from 'lodash';
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import DateRangeSelector, { getPeriodFromOption } from 'src/components/DateFilters/DatePeriodSelector';
import { type DateRange, PeriodType } from 'src/components/DateFilters/types';
import { sakStatuser, useTemaer } from 'src/components/saker/utils';
import type { DokumentmetadataAvsender } from 'src/generated/modiapersonoversikt-api';
import { trackExpansionCardApnet, trackExpansionCardLukket } from 'src/utils/analytics';
import { twMerge } from 'tailwind-merge';

export type SakerFilter = {
    dateRange: DateRange;
    temaer: string[];
    status: string[];
    saksId?: string;
    avsender: DokumentmetadataAvsender[];
};

const defaultDate = getPeriodFromOption(PeriodType.CUSTOM);

export const sakerFilterAtom = atomWithReset<SakerFilter>({
    dateRange: defaultDate,
    temaer: [],
    status: [],
    avsender: []
});

const sakerFilterTemaAtom = atom(
    (get) => get(sakerFilterAtom).temaer,
    (_get, set, newVal: string) => {
        set(sakerFilterAtom, (filters) => ({
            ...filters,
            temaer: filters.temaer ? xor(filters.temaer, [newVal]) : [newVal]
        }));
    }
);

const sakerFilterSaksIdAtom = atom(
    (get) => get(sakerFilterAtom).saksId,
    (_get, set, newVal: string) => {
        set(sakerFilterAtom, (filters) => ({
            ...filters,
            saksId: newVal.length ? newVal : undefined
        }));
    }
);

export const sakerFilterAvsenderAtom = atom(
    (get) => get(sakerFilterAtom).avsender,
    (_get, set, newVal: DokumentmetadataAvsender) => {
        set(sakerFilterAtom, (filters) => ({
            ...filters,
            avsender: xor(filters.avsender, [newVal])
        }));
    }
);

const sakerFilterStatusAtom = atom(
    (get) => get(sakerFilterAtom).status,
    (_get, set, newVal: string) => {
        set(sakerFilterAtom, (filters) => ({
            ...filters,
            status: xor(filters.status, [newVal])
        }));
    }
);

const sakerFilterDateRangeAtom = atom(
    (get) => get(sakerFilterAtom).dateRange,
    (_get, set, dateRange: DateRange | null) => {
        const range = dateRange ?? defaultDate;
        set(sakerFilterAtom, (filters) => ({
            ...filters,
            dateRange: range
        }));
    }
);

const SaksIdSearchField = () => {
    const [internalValue, setInternalValue] = useState('');
    const [value, setValue] = useAtom(sakerFilterSaksIdAtom);

    useEffect(() => {
        setInternalValue(value ?? '');
    }, [value]);

    const setAtomValue = debounce(setValue, 500);
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
    const [value, setValue] = useAtom(sakerFilterDateRangeAtom);
    return <DateRangeSelector range={value} onChange={setValue} defaultPeriodType={PeriodType.CUSTOM} />;
};

const TemaFilter = () => {
    const [selectedTema, setSelectedTema] = useAtom(sakerFilterTemaAtom);
    const temaer = useTemaer();

    const onToggleSelected = useCallback(
        (option: string) => {
            setSelectedTema(option);
        },
        [selectedTema]
    );

    return (
        <UNSAFE_Combobox
            size="small"
            label="Tema"
            options={temaer.map((o) => ({
                label: `${o.temanavn} [${o.temakode}]`,
                value: o.temakode
            }))}
            isMultiSelect
            selectedOptions={selectedTema}
            onToggleSelected={onToggleSelected}
        />
    );
};

const StatusFilter = () => {
    const [selectedStatus, setSelectedStatus] = useAtom(sakerFilterStatusAtom);
    const onToggleSelected = useCallback(
        (option: string) => {
            setSelectedStatus(option);
        },
        [setSelectedStatus]
    );

    return (
        <Fieldset size="small" legend="Status">
            <VStack gap="2">
                {sakStatuser.map((status) => (
                    <Switch
                        key={status}
                        size="small"
                        checked={selectedStatus.includes(status)}
                        onChange={() => onToggleSelected(status)}
                    >
                        <p className="capitalize font-medium">{status}</p>
                    </Switch>
                ))}
            </VStack>
        </Fieldset>
    );
};

const FilterTitle = () => {
    const filters = useAtomValue(sakerFilterAtom);

    const activeFilters = useMemo(() => {
        let count = 0;
        if (filters.saksId) {
            count++;
        }
        if (filters.temaer && filters.temaer.length > 0) {
            count++;
        }
        if (filters.status && filters.status.length > 0) {
            count++;
        }
        if (filters.dateRange) {
            count++;
        }

        return count ? `(${count})` : null;
    }, [filters]);

    return <>Filter {activeFilters}</>;
};

export const SakerFilter = () => {
    const [open, setOpen] = useState(false);
    const expansionFilterRef = useRef<HTMLDivElement>(null);

    const handleExpansionChange = () => {
        setTimeout(() => {
            if (!expansionFilterRef.current) return;
            const isOpen = expansionFilterRef.current.classList.contains('aksel-expansioncard--open');
            setOpen(isOpen);
            if (isOpen !== open) {
                isOpen ? trackExpansionCardLukket('sakerfilter') : trackExpansionCardApnet('sakerfilter');
            }
        }, 0);
    };

    return (
        <Box.New marginInline="0 2" className={twMerge(open && 'max-h-full')}>
            <ExpansionCard
                onClick={handleExpansionChange}
                ref={expansionFilterRef}
                className={twMerge(open && 'max-h-full overflow-auto')}
                size="small"
                aria-label="Filtrer saker"
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
                        <Box.New maxWidth="15rem">
                            <SaksIdSearchField />
                        </Box.New>
                        <Box.New maxWidth="15rem">
                            <Suspense
                                fallback={
                                    <VStack gap="2">
                                        <span className="font-ax-bold">Tema</span>
                                        <Skeleton width="100%" variant="rounded" height="2rem" />
                                    </VStack>
                                }
                            >
                                <TemaFilter />
                            </Suspense>
                        </Box.New>
                        <Box.New maxWidth="15rem">
                            <StatusFilter />
                        </Box.New>
                        <Box.New>
                            <DateFilter />
                        </Box.New>
                    </VStack>
                </ExpansionCard.Content>
            </ExpansionCard>
        </Box.New>
    );
};
