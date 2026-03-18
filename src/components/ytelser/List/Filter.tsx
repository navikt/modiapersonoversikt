import { BodyShort, Box, UNSAFE_Combobox, VStack } from '@navikt/ds-react';
import { atom, useAtom, useSetAtom } from 'jotai';
import { atomWithReset, RESET } from 'jotai/utils';
import { xor } from 'lodash';
import { useCallback, useEffect } from 'react';
import DateRangeSelector, { getPeriodFromOption } from 'src/components/DateFilters/DatePeriodSelector';
import { type DateRange, PeriodType } from 'src/components/DateFilters/types';
import { FilterExpansionCard } from 'src/components/FilterExpansionCard';
import { useFilterYtelser } from 'src/components/ytelser/utils';
import { usePersonAtomValue } from 'src/lib/state/context';
import { YtelseVedtakYtelseType } from 'src/models/ytelse/ytelse-utils';
import { filterType, trackFilterEndret } from 'src/utils/analytics';

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

    // TODO: Midlertidig; Fjern dette når gamle versjoner av pleiepenger, foreldrepenger og sykepenger er fjernet
    const ytelseTyper = Object.values(YtelseVedtakYtelseType).filter(
        (yType) =>
            yType !== YtelseVedtakYtelseType.ForeldrepengerFpSak &&
            yType !== YtelseVedtakYtelseType.SykepengerSpokelse &&
            yType !== YtelseVedtakYtelseType.Pleiepenger
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
    const { data: ytelser, isLoading } = useFilterYtelser();

    if (isLoading) {
        return <>Filter</>;
    }

    return (
        <>
            Filter ({ytelser.length} {ytelser.length === 1 ? 'ytelse' : 'ytelser'})
            <BodyShort visuallyHidden>funnet</BodyShort>
        </>
    );
};

export const YtelserListFilter = () => {
    const setFilter = useSetAtom(ytelseFilterAtom);
    const fnr = usePersonAtomValue();

    useEffect(() => {
        setFilter(RESET);
    }, [fnr]);

    return (
        <FilterExpansionCard fane="ytelser" title={<FilterTitle />}>
            <VStack gap="space-8">
                <Box maxWidth="17rem">
                    <YtelserTypeFilter />
                </Box>
                <Box>
                    <DateFilter />
                </Box>
            </VStack>
        </FilterExpansionCard>
    );
};
