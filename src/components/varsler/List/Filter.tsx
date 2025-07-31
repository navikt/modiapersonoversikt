import { Box, ExpansionCard, Fieldset, Switch, VStack } from '@navikt/ds-react';
import { atom, useAtom, useAtomValue } from 'jotai';
import { atomWithReset } from 'jotai/utils';
import { xor } from 'lodash';
import { useCallback, useMemo, useRef, useState } from 'react';
import DateRangeSelector, { getPeriodFromOption } from 'src/components/DateFilters/DatePeriodSelector';
import { type DateRange, PeriodType } from 'src/components/DateFilters/types';
import { twMerge } from 'tailwind-merge';

export type VarslerKanal = 'DITT_NAV' | 'EPOST' | 'SMS';

export type VarslerFilter = {
    dateRange: DateRange;
    failedVarslerOnly: boolean;
    kanaler: VarslerKanal[];
};

const defaultDate = getPeriodFromOption(PeriodType.CUSTOM);
const varslerKanaler: VarslerKanal[] = ['DITT_NAV', 'EPOST', 'SMS'];

export const varslerFilterAtom = atomWithReset<VarslerFilter>({
    dateRange: defaultDate,
    failedVarslerOnly: false,
    kanaler: varslerKanaler
});

const varslerFilterVarslerStatusAtom = atom(
    (get) => get(varslerFilterAtom).failedVarslerOnly,
    (_get, set, newVal: boolean) => {
        set(varslerFilterAtom, (filters) => ({
            ...filters,
            failedVarslerOnly: newVal
        }));
    }
);

const varslerFilterVarslerKanalAtom = atom(
    (get) => get(varslerFilterAtom).kanaler,
    (_get, set, newVal: VarslerKanal) => {
        set(varslerFilterAtom, (filters) => ({
            ...filters,
            kanaler: filters.kanaler ? xor(filters.kanaler, [newVal]) : [newVal]
        }));
    }
);

const varslerFilterDateRangeAtom = atom(
    (get) => get(varslerFilterAtom).dateRange,
    (_get, set, dateRange: DateRange | null) => {
        const range = dateRange ?? defaultDate;
        set(varslerFilterAtom, (filters) => ({
            ...filters,
            dateRange: range
        }));
    }
);

const DateFilter = () => {
    const [value, setValue] = useAtom(varslerFilterDateRangeAtom);
    return (
        <DateRangeSelector resettable={false} range={value} onChange={setValue} defaultPeriodType={PeriodType.CUSTOM} />
    );
};

const VarslerKanalFilter = () => {
    const [selectedKanaler, setSelectedKanaler] = useAtom(varslerFilterVarslerKanalAtom);
    const onToggleSelected = useCallback(
        (option: VarslerKanal) => {
            setSelectedKanaler(option);
        },
        [setSelectedKanaler]
    );

    return (
        <Fieldset size="small" legend="Varslingskanal">
            <VStack gap="2">
                {varslerKanaler.map((kanal) => (
                    <Switch
                        key={kanal}
                        size="small"
                        checked={selectedKanaler.includes(kanal)}
                        onChange={() => onToggleSelected(kanal)}
                    >
                        {kanal}
                    </Switch>
                ))}
            </VStack>
        </Fieldset>
    );
};

const VarslerStatusFilter = () => {
    const [failedVarsler, setFailedVarsler] = useAtom(varslerFilterVarslerStatusAtom);
    const onToggleSelected = useCallback(
        (option: boolean) => {
            setFailedVarsler(option);
        },
        [setFailedVarsler]
    );

    return (
        <Switch size="small" checked={failedVarsler} onChange={() => onToggleSelected(!failedVarsler)}>
            Vis varlser som feilet
        </Switch>
    );
};

const FilterTitle = () => {
    const filters = useAtomValue(varslerFilterAtom);

    const activeFilters = useMemo(() => {
        let count = 0;
        if (filters.failedVarslerOnly) {
            count++;
        }
        if (filters.kanaler && filters.kanaler.length > 0) {
            count++;
        }
        if (filters.dateRange) {
            count++;
        }

        return count ? `(${count})` : null;
    }, [filters]);

    return <>Filter {activeFilters}</>;
};

export const VarslerListFilter = () => {
    const [open, setOpen] = useState(false);
    const expansionFilterRef = useRef<HTMLDivElement>(null);

    const handleExpansionChange = () => {
        setTimeout(() => {
            if (!expansionFilterRef.current) return;
            setOpen(expansionFilterRef.current.classList.contains('aksel-expansioncard--open'));
        }, 0);
    };
    return (
        <Box.New marginInline="0 2" maxHeight={open ? '100%' : {}}>
            <ExpansionCard
                size="small"
                aria-label="Filtrer varsler"
                ref={expansionFilterRef}
                onClick={handleExpansionChange}
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
                        <Box.New maxWidth="17rem">
                            <VarslerKanalFilter />
                        </Box.New>
                        <Box.New maxWidth="17rem">
                            <VarslerStatusFilter />
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
