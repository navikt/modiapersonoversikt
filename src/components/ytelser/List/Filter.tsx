import { BodyShort, Box, ExpansionCard, UNSAFE_Combobox, VStack } from '@navikt/ds-react';
import { atom, useAtom, useSetAtom } from 'jotai';
import { atomWithReset, RESET } from 'jotai/utils';
import { xor } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import DateRangeSelector, { getPeriodFromOption } from 'src/components/DateFilters/DatePeriodSelector';
import { type DateRange, PeriodType } from 'src/components/DateFilters/types';
import { useFilterYtelser } from 'src/components/ytelser/utils';
import { usePersonAtomValue } from 'src/lib/state/context';
import { YtelseVedtakYtelseType } from 'src/models/ytelse/ytelse-utils';
import { filterType, trackExpansionCardApnet, trackExpansionCardLukket, trackFilterEndret } from 'src/utils/analytics';
import { twMerge } from 'tailwind-merge';

export type YtelseFilter = {
    dateRange: DateRange;
    ytelseTyper: string[];
};

const defaultDate = getPeriodFromOption(PeriodType.CUSTOM);

export const ytelseFilterAtom = atomWithReset<YtelseFilter>({
    dateRange: defaultDate,
    ytelseTyper: []
});

const filterYtelseTypeAtom = atom(
    (get) => get(ytelseFilterAtom).ytelseTyper,
    (_get, set, newVal: string) => {
        set(ytelseFilterAtom, (filters) => ({
            ...filters,
            ytelseTyper: filters.ytelseTyper ? xor(filters.ytelseTyper, [newVal]) : [newVal]
        }));
    }
);

const filterDateRangeAtom = atom(
    (get) => get(ytelseFilterAtom).dateRange,
    (_get, set, dateRange: DateRange | null) => {
        const range = dateRange ?? defaultDate;
        set(ytelseFilterAtom, (filters) => ({
            ...filters,
            dateRange: range
        }));
    }
);

const DateFilter = () => {
    const [value, setValue] = useAtom(filterDateRangeAtom);
    return <DateRangeSelector range={value} onChange={setValue} defaultPeriodType={PeriodType.CUSTOM} />;
};

const YtelserTypeFilter = () => {
    const [selectedYtelseType, setSelectedYtelseType] = useAtom(filterYtelseTypeAtom);

    const onToggleSelected = useCallback(
        (option: string) => {
            setSelectedYtelseType(option);
            trackFilterEndret('ytelser', filterType.TYPE);
        },
        [setSelectedYtelseType]
    );

    const ytelseTyper = Object.values(YtelseVedtakYtelseType).filter(
        (yType) => yType !== YtelseVedtakYtelseType.ForeldrepengerFpSak
    );

    return (
        <UNSAFE_Combobox
            size="small"
            label="Ytelse"
            options={ytelseTyper}
            isMultiSelect
            selectedOptions={selectedYtelseType}
            onToggleSelected={onToggleSelected}
        />
    );
};

const FilterTitle = () => {
    const { data: ytelser } = useFilterYtelser();

    return (
        <>
            Filter ({ytelser.length} {ytelser.length === 1 ? 'ytelse' : 'ytelser'})
            <BodyShort visuallyHidden>funnet</BodyShort>
        </>
    );
};

export const YtelserListFilter = () => {
    const setFilter = useSetAtom(ytelseFilterAtom);
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
                isOpen ? trackExpansionCardApnet('ytelsefilter') : trackExpansionCardLukket('ytelsefilter');
            }
        }, 0);
    };
    return (
        <Box.New marginInline="0 2" className={twMerge(open && 'max-h-full')}>
            <ExpansionCard
                onClick={handleExpansionChange}
                ref={expansionFilterRef}
                size="small"
                aria-label="Filtrer ytelser"
                className={twMerge('rounded-sm', open && 'max-h-full overflow-auto')}
            >
                <ExpansionCard.Header className="py-0 pr-0 hover:rounded-sm">
                    <ExpansionCard.Title size="small" as="h3" className="text-ax-medium" role="alert">
                        <FilterTitle />
                    </ExpansionCard.Title>
                </ExpansionCard.Header>
                <ExpansionCard.Content className="overflow-visible">
                    <VStack gap="2">
                        <Box.New maxWidth="17rem">
                            <YtelserTypeFilter />
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
