import { BodyShort, Box, ExpansionCard, UNSAFE_Combobox, VStack } from '@navikt/ds-react';
import { atom, useAtom, useSetAtom } from 'jotai';
import { atomWithReset, RESET } from 'jotai/utils';
import { xor } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import DateRangeSelector, { getPeriodFromOption } from 'src/components/DateFilters/DatePeriodSelector';
import { type DateRange, PeriodType } from 'src/components/DateFilters/types';
import { useFilterOppgave } from 'src/components/Oppgave/List/utils';
import { useGsakTema } from 'src/lib/clients/modiapersonoversikt-api';
import { usePersonAtomValue } from 'src/lib/state/context';
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
    const { data: oppgaver } = useFilterOppgave();

    return (
        <>
            Filter ({oppgaver.length} {oppgaver.length === 1 ? 'oppgave' : 'oppgaver'})
            <BodyShort visuallyHidden>funnet</BodyShort>
        </>
    );
};

export const OppgaveListFilter = () => {
    const setFilter = useSetAtom(oppgaveFilterAtom);
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
                isOpen ? trackExpansionCardApnet('oppgavefilter') : trackExpansionCardLukket('oppgavefilter');
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
                <ExpansionCard.Header className="py-0 pl-2">
                    <ExpansionCard.Title size="small" as="h3" className="text-ax-medium" role="alert">
                        <FilterTitle />
                    </ExpansionCard.Title>
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
