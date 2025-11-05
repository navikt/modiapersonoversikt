import { Box, ExpansionCard, UNSAFE_Combobox, VStack } from '@navikt/ds-react';
import { atom, useAtom, useAtomValue } from 'jotai';
import { atomWithReset } from 'jotai/utils';
import { xor } from 'lodash';
import { useCallback, useMemo, useRef, useState } from 'react';
import DateRangeSelector, { getPeriodFromOption } from 'src/components/DateFilters/DatePeriodSelector';
import { type DateRange, PeriodType } from 'src/components/DateFilters/types';
import { useGsakTema } from 'src/lib/clients/modiapersonoversikt-api';
import { filterType, trackExpansionCardApnet, trackExpansionCardLukket, trackFilterEndret } from 'src/utils/analytics';
import { twMerge } from 'tailwind-merge';

export type OppgaveFilter = {
    dateRange: DateRange;
    tema: string[];
};

const defaultDate = getPeriodFromOption(PeriodType.CUSTOM);

export const oppgaveFilterAtom = atomWithReset<OppgaveFilter>({
    dateRange: defaultDate,
    tema: []
});

const oppgaveFilterTemaAtom = atom(
    (get) => get(oppgaveFilterAtom).tema,
    (_get, set, newVal: string) => {
        set(oppgaveFilterAtom, (filters) => ({
            ...filters,
            tema: filters.tema ? xor(filters.tema, [newVal]) : [newVal]
        }));
    }
);

const oppgaveFilterDateRangeAtom = atom(
    (get) => get(oppgaveFilterAtom).dateRange,
    (_get, set, dateRange: DateRange | null) => {
        const range = dateRange ?? defaultDate;
        set(oppgaveFilterAtom, (filters) => ({
            ...filters,
            dateRange: range
        }));
    }
);

const DateFilter = () => {
    const [value, setValue] = useAtom(oppgaveFilterDateRangeAtom);
    return (
        <DateRangeSelector resettable={false} range={value} onChange={setValue} defaultPeriodType={PeriodType.CUSTOM} />
    );
};

const TemaFilter = () => {
    const [selectedTema, setSelectedTema] = useAtom(oppgaveFilterTemaAtom);
    const { data: temaer } = useGsakTema();

    const onToggleSelected = useCallback(
        (option: string) => {
            setSelectedTema(option);
            trackFilterEndret('oppgaver', filterType.TEMA);
        },
        [selectedTema]
    );

    return (
        <UNSAFE_Combobox
            size="small"
            label="Tema"
            options={temaer.map((o) => ({
                label: `${o.tekst} [${o.kode}]`,
                value: o.kode
            }))}
            isMultiSelect
            selectedOptions={selectedTema}
            onToggleSelected={onToggleSelected}
        />
    );
};

const FilterTitle = () => {
    const filters = useAtomValue(oppgaveFilterAtom);

    const activeFilters = useMemo(() => {
        let count = 0;
        if (filters.tema && filters.tema.length > 0) {
            count++;
        }
        if (filters.dateRange) {
            count++;
        }

        return count ? `(${count})` : null;
    }, [filters]);

    return <>Filter {activeFilters}</>;
};

export const OppgaveListFilter = () => {
    const [open, setOpen] = useState(false);
    const expansionFilterRef = useRef<HTMLDivElement>(null);

    const handleExpansionChange = () => {
        setTimeout(() => {
            if (!expansionFilterRef.current) return;
            const isOpen = expansionFilterRef.current.classList.contains('aksel-expansioncard--open');
            setOpen(isOpen);
            if (isOpen !== open) {
                isOpen ? trackExpansionCardLukket('oppgavefilter') : trackExpansionCardApnet('oppgavefilter');
            }
        }, 0);
    };
    return (
        <Box.New marginInline="0 2" maxHeight={open ? '100%' : {}}>
            <ExpansionCard
                size="small"
                aria-label="Filtrer oppgaver"
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
                            <TemaFilter />
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
