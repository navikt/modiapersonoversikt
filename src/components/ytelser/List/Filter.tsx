import { Box, ExpansionCard, UNSAFE_Combobox, VStack } from '@navikt/ds-react';
import { atom, useAtom, useAtomValue } from 'jotai';
import { atomWithReset } from 'jotai/utils';
import { xor } from 'lodash';
import { useCallback, useMemo } from 'react';
import DateRangeSelector, { getPeriodFromOption } from 'src/components/DateFilters/DatePeriodSelector';
import { type DateRange, PeriodType } from 'src/components/DateFilters/types';
import { YtelseVedtakYtelseType } from 'src/generated/modiapersonoversikt-api';

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

export const filterDateRangeAtom = atom(
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
    return <DateRangeSelector range={value} onChange={setValue} />;
};

const YtelserTypeFilter = () => {
    const [selectedYtelseType, setSelectedYtelseType] = useAtom(filterYtelseTypeAtom);

    const onToggleSelected = useCallback(
        (option: string) => {
            setSelectedYtelseType(option);
        },
        [setSelectedYtelseType]
    );

    const ytelseTyper = [
        YtelseVedtakYtelseType.Foreldrepenger,
        YtelseVedtakYtelseType.Sykepenger,
        YtelseVedtakYtelseType.Pleiepenger,
        YtelseVedtakYtelseType.Tiltakspenge,
        YtelseVedtakYtelseType.Pensjon
    ];

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
    const filters = useAtomValue(ytelseFilterAtom);

    const activeFilters = useMemo(() => {
        let count = 0;
        if (filters.ytelseTyper && filters.ytelseTyper.length > 0) {
            count++;
        }
        if (filters.dateRange) {
            count++;
        }

        return count ? `(${count})` : null;
    }, [filters]);

    return <>Filter {activeFilters}</>;
};

export const YtelserListFilter = () => {
    return (
        <Box.New marginInline="0 2">
            <ExpansionCard size="small" aria-label="Filtrer ytelser">
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
